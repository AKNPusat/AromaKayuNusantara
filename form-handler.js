// ===================================================================
// KODE SURAT JALAN - DENGAN LOGIKA PENCARIAN DARI form-handler.js
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

    let dataPengirimanSaatIni = null;

    // --- FUNGSI UNTUK MENCARI & MENAMPILKAN DATA RESI ---
    function cariDanTampilkanResi(nomorResi) {
        db.collection("shipments").doc(nomorResi).get().then(doc => {
            if (doc.exists) {
                dataPengirimanSaatIni = doc.data();
                const data = dataPengirimanSaatIni;

                // Tampilkan detail dasar
                document.getElementById('nomor-resi-display').textContent = data.nomorResi;
                document.getElementById('deskripsi-asli').textContent = data.detailBarang.deskripsi;
                
                // Siapkan container
                const stokContainer = document.getElementById('stok-barang-container');
                const inputContainer = document.getElementById('input-pengambilan-container');
                stokContainer.innerHTML = '<ul>';
                inputContainer.innerHTML = '';

                // Ambil data stok
                let stokItems = {};
                if (data.stok && Object.keys(data.stok).length > 0) {
                    stokItems = data.stok;
                } else if (data.detailBarang.deskripsi) {
                    const deskripsiItems = data.detailBarang.deskripsi.split(',');
                    deskripsiItems.forEach(item => {
                        const match = item.match(/(.+)\((\d+)\)/);
                        if (match) stokItems[match[1].trim()] = parseInt(match[2]);
                    });
                }
                
                // Tampilkan stok dan buat input field
                for (const namaBarang in stokItems) {
                    const stokSaatIni = stokItems[namaBarang];
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
            } else {
                alert("Masukkan nomor resi terlebih dahulu.");
            }
        });
    }

    // --- (Kode untuk form pengambilan dan generate surat jalan tetap di sini, tidak berubah) ---

});

        // --- Menjalankan fungsi awal dan event listener ---
        updateFormTampilan();
        armadaSelect.addEventListener('change', updateFormTampilan);
        isiBarangText.addEventListener('input', kalkulasiOtomatis);
        beratBarangInput.addEventListener('input', kalkulasiOtomatis);

        // --- LOGIKA SUBMIT FORM (SIMPAN & UPDATE) ---
        formResi.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomorResi = nomorResiInput.value;
            kalkulasiOtomatis();
            const ongkosKirimValue = parseInt(ongkosKirimInput.value.replace(/[^0-9]/g, '')) || 0;

            const dataToSave = {
                nomorResi: nomorResi,
                tanggalKirim: tanggalKirimInput.value,
                armada: armadaSelect.value,
                pengirim: {
                    nama: document.getElementById('nama-pengirim').value,
                    telepon: document.getElementById('telp-pengirim').value
                },
                penerima: {
                    nama: document.getElementById('nama-penerima').value,
                    telepon: document.getElementById('telp-penerima').value
                },
                detailBarang: {
                    merek: merekInput.value,
                    deskripsi: isiBarangText.value,
                    jumlahKoli: parseInt(jumlahKoliInput.value) || 0,
                    beratKg: parseFloat(beratBarangInput.value) || 0
                },
                ongkosKirim: ongkosKirimValue
            };

            if (!isEditMode) {
                dataToSave.status = "Data Dibuat";
                dataToSave.lokasiTerkini = "Kantor Papua";
                // ... (riwayat status bisa ditambahkan di sini)
            }
            
            db.collection("shipments").doc(nomorResi).set(dataToSave, { merge: true })
            .then(() => {
                alert(`Data untuk resi ${nomorResi} berhasil di-${isEditMode ? 'update' : 'simpan'}!`);
                if (isEditMode) {
                    window.location.reload();
                } else {
                    formResi.reset();
                    updateFormTampilan();
                }
            }).catch((error) => {
                console.error("Error: ", error);
                alert("Gagal menyimpan data.");
            });
        });
    }
});
