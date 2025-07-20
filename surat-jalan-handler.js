// ===================================================================
// KODE FINAL SURAT JALAN (SUDAH ANTI-ERROR UNTUK DATA LAMA)
// ===================================================================

document.addEventListener("DOMContentLoaded", function() {
    
    // --- Inisialisasi Firebase ---
    const firebaseConfig = { /* ... PASTE KONFIGURASI ANDA DI SINI ... */ };
    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
    const db = firebase.firestore();

    let dataPengirimanSaatIni = null;
    let stokAwalItems = {}; // Untuk menyimpan stok awal

    const formCari = document.getElementById('form-cari-surat-jalan');
    if (formCari) {
        formCari.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomorResi = document.getElementById('nomor-resi-sj').value.trim();
            
            db.collection("shipments").doc(nomorResi).get().then(doc => {
                if (doc.exists) {
                    dataPengirimanSaatIni = doc.data();
                    const data = dataPengirimanSaatIni;
                    stokAwalItems = {}; // Reset setiap kali pencarian baru
                    
                    // ... (Tampilkan nomor resi & deskripsi)
                    
                    const stokContainer = document.getElementById('stok-barang-container');
                    const inputContainer = document.getElementById('input-pengambilan-container');
                    stokContainer.innerHTML = '<ul>';
                    inputContainer.innerHTML = '';

                    // Prioritaskan field 'stok' jika ada
                    if (data.stok && Object.keys(data.stok).length > 0) {
                        stokAwalItems = data.stok;
                    } 
                    // Jika tidak ada, parse dari 'deskripsi'
                    else if (data.detailBarang.deskripsi) {
                        const deskripsiItems = data.detailBarang.deskripsi.split(',').map(item => item.trim());
                        deskripsiItems.forEach(item => {
                            const match = item.match(/(.+)\((\d+)\)/);
                            if (match) stokAwalItems[match[1].trim()] = parseInt(match[2]);
                        });
                    }

                    // Tampilkan item
                    for (const namaBarang in stokAwalItems) {
                        const stokSaatIni = stokAwalItems[namaBarang];
                        // ... (kode untuk menampilkan stok dan input field sama seperti sebelumnya)
                    }
                    stokContainer.innerHTML += '</ul>';
                    document.getElementById('tahap-2-detail-barang').style.display = 'block';

                } else {
                    alert('Resi tidak ditemukan!');
                }
            }).catch(error => {
                console.error("Error:", error);
                alert("Terjadi kesalahan. Cek console.");
            });
        });
    }

    const formPengambilan = document.getElementById('form-pengambilan-barang');
    if (formPengambilan) {
        formPengambilan.addEventListener('submit', function(e) {
            e.preventDefault();
            // ... (ambil nomorResi, namaPengambil, dll.)
            
            const itemDiambil = [];
            const updateStok = {};

            document.querySelectorAll('.input-ambil').forEach(input => {
                const jumlahAmbil = parseInt(input.value);
                if (jumlahAmbil > 0) {
                    itemDiambil.push({ nama: input.name, jumlah: jumlahAmbil });
                    
                    // KUNCI PERBAIKAN DI SINI
                    // Kita gunakan stokAwalItems yang sudah kita siapkan, bukan dataPengirimanSaatIni.stok
                    const stokSekarang = stokAwalItems[input.name] || 0;
                    updateStok[`stok.${input.name}`] = stokSekarang - jumlahAmbil;
                }
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
