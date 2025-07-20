// ===================================================================
// KODE FINAL UNTUK SURAT JALAN - Aroma Kayu Nusantara (Telah Disempurnakan)
// ===================================================================

document.addEventListener("DOMContentLoaded", function() {
    
    // --- Inisialisasi Firebase ---
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

    // Variabel global untuk menyimpan data resi yang sedang aktif
    let dataPengirimanSaatIni = null;

    // ========================================================
    // --- HANDLER UNTUK FORM CARI RESI ---
    // ========================================================
    const formCari = document.getElementById('form-cari-surat-jalan');
    if (formCari) {
        formCari.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomorResi = document.getElementById('nomor-resi-sj').value.trim();
            if (!nomorResi) {
                alert("Masukkan nomor resi terlebih dahulu.");
                return;
            }
            
            db.collection("shipments").doc(nomorResi).get().then(doc => {
                if (doc.exists) {
                    dataPengirimanSaatIni = doc.data(); // Simpan data yang ditemukan
                    const data = dataPengirimanSaatIni;
                    
                    // Tampilkan data ke Tahap 2
                    document.getElementById('nomor-resi-display').textContent = data.nomorResi;
                    document.getElementById('deskripsi-asli').textContent = data.detailBarang.deskripsi;
                    
                    // Proses data stok (bukan lagi dari deskripsi)
                    const stokContainer = document.getElementById('stok-barang-container');
                    const inputContainer = document.getElementById('input-pengambilan-container');
                    stokContainer.innerHTML = '<ul>';
                    inputContainer.innerHTML = '';

                    // Gunakan data dari field 'stok' yang sudah kita buat saat input resi
                    if (data.stok && Object.keys(data.stok).length > 0) {
                        for (const namaBarang in data.stok) {
                            const stokSaatIni = data.stok[namaBarang];
                            
                            if (stokSaatIni > 0) { // Hanya tampilkan barang yang masih ada stok
                                stokContainer.innerHTML += `<li><strong>${namaBarang}:</strong> ${stokSaatIni} karung</li>`;
                                
                                // Buat input untuk pengambilan
                                inputContainer.innerHTML += `
                                    <div class="form-group">
                                        <label for="ambil_${namaBarang}">Jumlah ${namaBarang} yang akan diambil:</label>
                                        <input type="number" id="ambil_${namaBarang}" name="${namaBarang}" min="0" max="${stokSaatIni}" value="0" class="input-ambil">
                                    </div>
                                `;
                            } else {
                                stokContainer.innerHTML += `<li><strong style="text-decoration: line-through;">${namaBarang}:</strong> Habis</li>`;
                            }
                        }
                    } else {
                        stokContainer.innerHTML = '<p style="color: red;">Data stok untuk resi ini tidak ditemukan atau kosong.</p>';
                    }

                    stokContainer.innerHTML += '</ul>';
                    document.getElementById('tahap-2-detail-barang').style.display = 'block';

                } else {
                    alert('Resi tidak ditemukan!');
                    document.getElementById('tahap-2-detail-barang').style.display = 'none';
                }
            });
        });
    }

    // ========================================================
    // --- HANDLER UNTUK FORM PENGAMBILAN BARANG ---
    // ========================================================
    const formPengambilan = document.getElementById('form-pengambilan-barang');
    if(formPengambilan) {
        formPengambilan.addEventListener('submit', function(e){
            e.preventDefault();
            const nomorResi = document.getElementById('nomor-resi-sj').value;
            const namaPengambil = document.getElementById('nama-pengambil').value;
            const kendaraanPengambil = document.getElementById('kendaraan-pengambil').value;
            
            const itemDiambil = [];
            const inputAmbilElements = document.querySelectorAll('.input-ambil');
            const updateStok = {}; // Objek untuk menyimpan perubahan stok

            inputAmbilElements.forEach(input => {
                const jumlahAmbil = parseInt(input.value);
                if(jumlahAmbil > 0) {
                    itemDiambil.push({
                        nama: input.name,
                        jumlah: jumlahAmbil
                    });
                    const stokSekarang = parseInt(input.max);
                    updateStok[`stok.${input.name}`] = stokSekarang - jumlahAmbil;
                }
            });

            if(itemDiambil.length === 0) {
                alert('Tidak ada barang yang diambil! Masukkan jumlah di salah satu item.');
                return;
            }

            // --- ALUR KERJA BARU YANG LEBIH AMAN ---
            const suratJalanId = `SJ-${nomorResi}-${Date.now()}`;
            const suratJalanData = {
                id: suratJalanId,
                nomorResi: nomorResi,
                tanggalDibuat: firebase.firestore.FieldValue.serverTimestamp(),
                pengambil: { nama: namaPengambil, kendaraan: kendaraanPengambil },
                items: itemDiambil,
                pengirimAsli: dataPengirimanSaatIni.pengirim.nama,
                penerimaAsli: dataPengirimanSaatIni.penerima.nama
            };

            // 1. Simpan Surat Jalan ke collection baru
            db.collection("surat_jalan").doc(suratJalanId).set(suratJalanData)
            .then(() => {
                // 2. Jika berhasil, baru update stok di resi
                return db.collection("shipments").doc(nomorResi).update(updateStok);
            })
            .then(() => {
                // 3. Jika semua berhasil, generate & print
                alert("Surat jalan berhasil dibuat dan stok telah diperbarui!");
                generateSuratJalan(suratJalanData);
                // Reset tampilan
                formCari.reset();
                formPengambilan.reset();
                document.getElementById('tahap-2-detail-barang').style.display = 'none';
            })
            .catch(error => {
                console.error("Terjadi Kesalahan: ", error);
                alert("Gagal memproses permintaan. Silakan coba lagi.");
            });
        });
    }

    // --- FUNGSI UNTUK GENERATE SURAT JALAN (SUDAH DISEMPURNAKAN) ---
    function generateSuratJalan(data) {
        let itemRows = '';
        data.items.forEach((item, index) => {
            itemRows += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.nama}</td>
                    <td>${item.jumlah} Karung</td>
                </tr>
            `;
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
                        .header-info { margin-top: 20px; }
                        .header-info p { margin: 5px 0; }
                        table { width: 100%; border-collapse: collapse; margin-top: 25px; }
                        th, td { border: 1px solid black; padding: 10px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        .signatures { margin-top: 60px; display: flex; justify-content: space-around; text-align: center; }
                    </style>
                </head>
                <body onload="window.print();">
                    <div class="container">
                        <h1>SURAT JALAN</h1>
                        <div class="header-info">
                            <p><strong>No. Dokumen:</strong> ${data.id}</p>
                            <p><strong>No. Resi Induk:</strong> ${data.nomorResi}</p>
                            <p><strong>Tanggal:</strong> ${new Date().toLocaleDateString('id-ID', {day: '2-digit', month: 'long', year: 'numeric'})}</p>
                            <hr>
                            <p><strong>Dikirim Oleh:</strong> PT. Aroma Kayu Nusantara (Gudang Probolinggo)</p>
                            <p><strong>Diterima Oleh (sesuai resi):</strong> ${data.penerimaAsli}</p>
                            <hr>
                            <p><strong>Nama Pengambil:</strong> ${data.pengambil.nama}</p>
                            <p><strong>No. Kendaraan:</strong> ${data.pengambil.kendaraan}</p>
                        </div>
                        <table>
                            <thead>
                                <tr><th>No</th><th>Nama Barang</th><th>Jumlah</th></tr>
                            </thead>
                            <tbody>
                                ${itemRows}
                            </tbody>
                        </table>
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
