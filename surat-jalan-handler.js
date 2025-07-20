// ===================================================================
// KODE SURAT JALAN (MENGGUNAKAN LOGIKA PENCARIAN YANG SUDAH TERBUKTI)
// ===================================================================

document.addEventListener("DOMContentLoaded", function() {
    
    // --- Inisialisasi Firebase ---
    const firebaseConfig = {
        apiKey: "AIzaSy...", // GANTI DENGAN KUNCI ANDA
        authDomain: "...",
        // ...dan seterusnya
    };
    
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    let dataPengirimanSaatIni = null;

    // --- HANDLER UNTUK FORM CARI RESI ---
    const formCari = document.getElementById('form-cari-surat-jalan');
    if (formCari) {
        formCari.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomorResi = document.getElementById('nomor-resi-sj').value.trim();
            if (!nomorResi) {
                alert("Masukkan nomor resi.");
                return;
            }

            console.log(`Mencari data untuk resi: ${nomorResi}`); // Debugging

            // --- Logika Pencarian yang Sama Seperti form-handler.js ---
            db.collection("shipments").doc(nomorResi).get().then(doc => {
                console.log("Hasil dari Firebase:", doc); // Debugging
                if (doc.exists) {
                    console.log("Dokumen ditemukan:", doc.data()); // Debugging
                    dataPengirimanSaatIni = doc.data();
                    
                    // Panggil fungsi untuk menampilkan data
                    tampilkanDetailUntukSuratJalan(dataPengirimanSaatIni);

                } else {
                    console.log("Dokumen tidak ditemukan."); // Debugging
                    alert('Resi tidak ditemukan!');
                    document.getElementById('tahap-2-detail-barang').style.display = 'none';
                }
            }).catch(error => {
                console.error("Error saat mencari resi: ", error);
                alert("Terjadi kesalahan saat mengambil data. Cek console.");
            });
        });
    }

    // --- Fungsi untuk Menampilkan Detail ---
    function tampilkanDetailUntukSuratJalan(data) {
        document.getElementById('nomor-resi-display').textContent = data.nomorResi;
        
        const stokContainer = document.getElementById('stok-barang-container');
        const inputContainer = document.getElementById('input-pengambilan-container');
        stokContainer.innerHTML = '<ul>';
        inputContainer.innerHTML = '';

        let stokItems = {};
        if (data.stok && Object.keys(data.stok).length > 0) {
            stokItems = data.stok;
        } else if (data.detailBarang && data.detailBarang.deskripsi) {
            // Fallback untuk data lama
            const deskripsiItems = data.detailBarang.deskripsi.split(',');
            deskripsiItems.forEach(item => {
                const match = item.match(/(.+)\((\d+)\)/);
                if (match) stokItems[match[1].trim()] = parseInt(match[2]);
            });
        }
        
        for (const namaBarang in stokItems) {
            const stokSaatIni = stokItems[namaBarang];
            stokContainer.innerHTML += `<li><strong>${namaBarang}:</strong> ${stokSaatIni} karung</li>`;
            if (stokSaatIni > 0) {
                inputContainer.innerHTML += `<div class="form-group"><label>...${namaBarang}...</label><input ... name="${namaBarang}" max="${stokSaatIni}" ...></div>`;
            }
        }
        stokContainer.innerHTML += '</ul>';
        document.getElementById('tahap-2-detail-barang').style.display = 'block';
    }

    // --- (Kode untuk form pengambilan dan generate surat jalan tetap di sini) ---

});

            if (itemDiambil.length === 0) {
                alert('Tidak ada barang yang diambil!');
                return;
            }
            
            const suratJalanId = `SJ-${nomorResi}-${Date.now()}`;
            const suratJalanData = { /* ... data surat jalan ... */ };

            // Alur kerja aman
            db.collection("surat_jalan").doc(suratJalanId).set(suratJalanData)
            .then(() => {
                // Gunakan .set dengan { merge: true } untuk membuat field 'stok' jika belum ada
                return db.collection("shipments").doc(nomorResi).set({ stok: {} }, { merge: true })
                         .then(() => db.collection("shipments").doc(nomorResi).update(updateStok));
            })
            .then(() => {
                alert("Surat jalan berhasil dibuat dan stok diperbarui!");
                // ... (reset form & generate surat jalan)
            })
            .catch(error => {
                console.error("Error: ", error);
                alert("Terjadi kesalahan!");
            });
        });
    }

    function generateSuratJalan(data) { /* ... (fungsi ini tidak berubah) ... */ }
});

    function generateSuratJalan(data) {
        let itemRows = '';
        data.items.forEach((item, index) => {
            itemRows += `<tr><td>${index + 1}</td><td>${item.nama}</td><td>${item.jumlah} Karung</td></tr>`;
        });

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Surat Jalan - ${data.nomorResi}</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .container { width: 80%; margin: 0 auto; }
                        h1 { text-align: center; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid black; padding: 8px; text-align: left; }
                        .signatures { margin-top: 50px; display: flex; justify-content: space-around; }
                    </style>
                </head>
                <body onload="window.print()">
                    <div class="container">
                        <h1>SURAT JALAN</h1>
                        <p><strong>No. Dokumen:</strong> ${data.id}</p>
                        <p><strong>No. Resi Induk:</strong> ${data.nomorResi}</p>
                        <p><strong>Diterima Oleh (sesuai resi):</strong> ${data.penerimaAsli}</p>
                        <hr>
                        <p><strong>Nama Pengambil:</strong> ${data.pengambil.nama}</p>
                        <p><strong>No. Kendaraan:</strong> ${data.pengambil.kendaraan}</p>
                        <table>
                            <thead>
                                <tr><th>No</th><th>Nama Barang</th><th>Jumlah</th></tr>
                            </thead>
                            <tbody>
                                ${itemRows}
                            </tbody>
                        </table>
                        <div class="signatures">
                            <div><p>Hormat Kami,</p><br><br><p>(___________________)</p><p>Gudang</p></div>
                            <div><p>Penerima,</p><br><br><p>(___________________)</p><p>${data.pengambil.nama}</p></div>
                        </div>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
    }
});
