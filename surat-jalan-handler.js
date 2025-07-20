// ===================================================================
// KODE FINAL & LENGKAP UNTUK SURAT JALAN
// ===================================================================

document.addEventListener("DOMContentLoaded", function() {
    
    // --- Inisialisasi Firebase ---
    // PENTING: PASTIKAN INI ADALAH KONFIGURASI FIREBASE ASLI ANDA
    const firebaseConfig = {
        apiKey: "AIzaSyDDJpU3mzKY2s-pihTz0XmL1BcrfTS_vRQ",
        authDomain: "aroma-kayu-nusantara.firebaseapp.com",
        projectId: "aroma-kayu-nusantara",
        storageBucket: "aroma-kayu-nusantara.firebasestorage.app",
        messagingSenderId: "519933206110",
        appId: "1:519933206110:web:1620a50af9f88c56f2decf"
    };
    
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    let dataPengirimanSaatIni = null;
    let stokAwalItems = {};

    // --- FUNGSI UNTUK MENCARI & MENAMPILKAN DATA RESI ---
    function cariDanTampilkanResi(nomorResi) {
        db.collection("shipments").doc(nomorResi).get().then(doc => {
            if (doc.exists) {
                dataPengirimanSaatIni = doc.data();
                const data = dataPengirimanSaatIni;
                stokAwalItems = {};

                document.getElementById('nomor-resi-display').textContent = data.nomorResi;
                document.getElementById('deskripsi-asli').textContent = data.detailBarang.deskripsi;
                
                const stokContainer = document.getElementById('stok-barang-container');
                const inputContainer = document.getElementById('input-pengambilan-container');
                stokContainer.innerHTML = '<ul>';
                inputContainer.innerHTML = '';

                if (data.stok && Object.keys(data.stok).length > 0) {
                    stokAwalItems = data.stok;
                } else if (data.detailBarang.deskripsi) {
                    const deskripsiItems = data.detailBarang.deskripsi.split(',');
                    deskripsiItems.forEach(item => {
                        const match = item.match(/(.+)\((\d+)\)/);
                        if (match) stokAwalItems[match[1].trim()] = parseInt(match[2]);
                    });
                }
                
                for (const namaBarang in stokAwalItems) {
                    const stokSaatIni = stokAwalItems[namaBarang];
                    if (stokSaatIni > 0) {
                        stokContainer.innerHTML += `<li><strong>${namaBarang}:</strong> ${stokSaatIni} karung</li>`;
                        inputContainer.innerHTML += `<div class="form-group"><label>Jumlah ${namaBarang} diambil:</label><input type="number" name="${namaBarang}" class="input-ambil" min="0" max="${stokSaatIni}" value="0"></div>`;
                    } else {
                        stokContainer.innerHTML += `<li><strong style="text-decoration: line-through;">${namaBarang}:</strong> Habis</li>`;
                    }
                }
                stokContainer.innerHTML += '</ul>';
                document.getElementById('tahap-2-detail-barang').style.display = 'block';

            } else {
                alert('Resi tidak ditemukan!');
                document.getElementById('tahap-2-detail-barang').style.display = 'none';
            }
        }).catch(error => {
            console.error("Error saat mencari resi:", error);
            alert("Terjadi kesalahan. Cek console.");
        });
    }

    // --- Event Listener untuk Form Pencarian ---
    const formCari = document.getElementById('form-cari-surat-jalan');
    if (formCari) {
        formCari.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomorResi = document.getElementById('nomor-resi-sj').value.trim();
            if (nomorResi) {
                cariDanTampilkanResi(nomorResi);
            }
        });
    }

    // --- HANDLER UNTUK FORM PENGAMBILAN BARANG ---
    const formPengambilan = document.getElementById('form-pengambilan-barang');
    if(formPengambilan) {
        formPengambilan.addEventListener('submit', function(e){
            e.preventDefault();
            const nomorResi = document.getElementById('nomor-resi-sj').value;
            const namaPengambil = document.getElementById('nama-pengambil').value;
            const kendaraanPengambil = document.getElementById('kendaraan-pengambil').value;
            const itemDiambil = [];
            const updateStok = {};

            document.querySelectorAll('.input-ambil').forEach(input => {
                const jumlahAmbil = parseInt(input.value);
                if(jumlahAmbil > 0) {
                    itemDiambil.push({ nama: input.name, jumlah: jumlahAmbil });
                    const stokSekarang = stokAwalItems[input.name] || 0;
                    updateStok[`stok.${input.name}`] = stokSekarang - jumlahAmbil;
                }
            });

            if(itemDiambil.length === 0) {
                alert('Tidak ada barang yang diambil!');
                return;
            }

            const suratJalanId = `SJ-${nomorResi}-${Date.now()}`;
            const suratJalanData = {
                id: suratJalanId, nomorResi: nomorResi,
                tanggalDibuat: firebase.firestore.FieldValue.serverTimestamp(),
                pengambil: { nama: namaPengambil, kendaraan: kendaraanPengambil },
                items: itemDiambil,
                penerimaAsli: dataPengirimanSaatIni.penerima.nama
            };

            db.collection("surat_jalan").doc(suratJalanId).set(suratJalanData)
            .then(() => db.collection("shipments").doc(nomorResi).set({ stok: {} }, { merge: true }))
            .then(() => db.collection("shipments").doc(nomorResi).update(updateStok))
            .then(() => {
                alert("Surat jalan berhasil dibuat dan stok diperbarui!");
                generateSuratJalan(suratJalanData);
                formCari.reset();
                formPengambilan.reset();
                document.getElementById('tahap-2-detail-barang').style.display = 'none';
            })
            .catch(error => { console.error("Error: ", error); alert("Terjadi kesalahan!"); });
        });
    }

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
                        body { font-family: Arial, sans-serif; font-size: 12pt; }
                        .container { width: 90%; margin: 0 auto; }
                        h1 { text-align: center; border-bottom: 2px solid black; padding-bottom: 10px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 25px; }
                        th, td { border: 1px solid black; padding: 10px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        .signatures { margin-top: 60px; display: flex; justify-content: space-around; text-align: center; }
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
                        <table><thead><tr><th>No</th><th>Nama Barang</th><th>Jumlah</th></tr></thead><tbody>${itemRows}</tbody></table>
                        <div class="signatures">
                            <div><p>Hormat Kami,</p><br><br><br><p>(___________________)</p><p><strong>Kepala Gudang</strong></p></div>
                            <div><p>Penerima,</p><br><br><br><p>(___________________)</p><p><strong>${data.pengambil.nama}</strong></p></div>
                        </div>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
    }
});
