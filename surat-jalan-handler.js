// ===================================================================
// KODE FINAL SURAT JALAN (PERBAIKAN LOGIKA UPDATE STOK)
// ===================================================================

document.addEventListener("DOMContentLoaded", function() {
    
    const firebaseConfig = { /* ... PASTE KONFIGURASI FIREBASE ANDA ... */ };
    
    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
    const db = firebase.firestore();

    let dataPengirimanSaatIni = null;
    let stokAwalItems = {}; // Variabel ini sangat penting

    // --- HANDLER UNTUK FORM CARI RESI ---
    const formCari = document.getElementById('form-cari-surat-jalan');
    if (formCari) {
        formCari.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomorResi = document.getElementById('nomor-resi-sj').value.trim();
            
            db.collection("shipments").doc(nomorResi).get().then(doc => {
                if (doc.exists) {
                    dataPengirimanSaatIni = doc.data();
                    const data = dataPengirimanSaatIni;
                    stokAwalItems = {}; // Reset setiap kali pencarian

                    // Tampilkan detail dasar
                    // ... (kode untuk menampilkan nomor resi & deskripsi)

                    const stokContainer = document.getElementById('stok-barang-container');
                    const inputContainer = document.getElementById('input-pengambilan-container');
                    stokContainer.innerHTML = '<ul>';
                    inputContainer.innerHTML = '';

                    // Prioritaskan field 'stok', jika tidak ada, parse dari 'deskripsi'
                    if (data.stok && Object.keys(data.stok).length > 0) {
                        stokAwalItems = data.stok;
                    } else if (data.detailBarang && data.detailBarang.deskripsi) {
                        const deskripsiItems = data.detailBarang.deskripsi.split(',');
                        deskripsiItems.forEach(item => {
                            const match = item.match(/(.+)\((\d+)\)/);
                            if (match) stokAwalItems[match[1].trim()] = parseInt(match[2]);
                        });
                    }
                    
                    // Tampilkan stok dan buat input field
                    for (const namaBarang in stokAwalItems) {
                        const stokSaatIni = stokAwalItems[namaBarang];
                        // ... (kode untuk menampilkan stok dan input field sama seperti sebelumnya) ...
                    }
                    stokContainer.innerHTML += '</ul>';
                    document.getElementById('tahap-2-detail-barang').style.display = 'block';

                } else {
                    alert('Resi tidak ditemukan!');
                }
            });
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
                    const namaBarang = input.name;
                    itemDiambil.push({ nama: namaBarang, jumlah: jumlahAmbil });
                    
                    // KUNCI PERBAIKAN DI SINI
                    // Gunakan stokAwalItems yang sudah kita siapkan, bukan data dari server
                    const stokSekarang = stokAwalItems[namaBarang] || 0;
                    updateStok[`stok.${namaBarang}`] = stokSekarang - jumlahAmbil;
                }
            });

            if(itemDiambil.length === 0) {
                alert('Tidak ada barang yang diambil!');
                return;
            }
            
            const suratJalanId = `SJ-${nomorResi}-${Date.now()}`;
            const suratJalanData = { /* ... (data surat jalan) ... */ };

            // ALUR KERJA BARU YANG AMAN UNTUK DATA LAMA
            db.collection("surat_jalan").doc(suratJalanId).set(suratJalanData)
            .then(() => {
                // Pertama, pastikan field 'stok' ada. Jika tidak, buat dulu.
                // Ini akan "memodernisasi" data lama Anda secara otomatis.
                if (!dataPengirimanSaatIni.stok) {
                    return db.collection("shipments").doc(nomorResi).update({ stok: stokAwalItems });
                }
            })
            .then(() => {
                // Kedua, baru lakukan update pengurangan stok.
                return db.collection("shipments").doc(nomorResi).update(updateStok);
            })
            .then(() => {
                alert("Surat jalan berhasil dibuat dan stok diperbarui!");
                generateSuratJalan(suratJalanData);
                // Reset form
                formCari.reset();
                formPengambilan.reset();
                document.getElementById('tahap-2-detail-barang').style.display = 'none';
            })
            .catch(error => {
                console.error("Error: ", error);
                alert("Terjadi kesalahan saat memproses!");
            });
        });
    }

    function generateSuratJalan(data) { /* ... (fungsi ini tidak berubah) ... */ }
});
