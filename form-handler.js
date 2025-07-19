// ===================================================================
// KODE FINAL & LENGKAP UNTUK form-handler.js (BISA INPUT & EDIT)
// ===================================================================
document.addEventListener("DOMContentLoaded", function() {
    // PASTE KONFIGURASI FIREBASE ANDA DI SINI
    const firebaseConfig = { /* ... */ };
    
    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
    const db = firebase.firestore();

    const formResi = document.getElementById('form-resi');
    if (formResi) {
        // --- Ambil semua elemen form ---
        const nomorResiInput = document.getElementById('nomor-resi');
        const tanggalKirimInput = document.getElementById('tanggal-kirim');
        // ... (ambil semua elemen input lainnya seperti di jawaban sebelumnya)
        const submitButton = formResi.querySelector('.submit-button');
        const formTitle = document.getElementById('form-title');

        // --- FUNGSI BARU: Mengambil data dari URL ---
        const urlParams = new URLSearchParams(window.location.search);
        const resiToEdit = urlParams.get('resi');
        let isEditMode = false;

        // --- FUNGSI BARU: Memuat data ke form untuk mode EDIT ---
        function loadDataForEdit(resi) {
            db.collection("shipments").doc(resi).get().then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    // Isi semua field form dengan data dari Firebase
                    nomorResiInput.value = data.nomorResi;
                    tanggalKirimInput.value = data.tanggalKirim;
                    document.getElementById('nama-pengirim').value = data.pengirim.nama;
                    document.getElementById('telp-pengirim').value = data.pengirim.telepon;
                    document.getElementById('nama-penerima').value = data.penerima.nama;
                    document.getElementById('telp-penerima').value = data.penerima.telepon;
                    document.getElementById('isi-barang').value = data.detailBarang.deskripsi;
                    document.getElementById('merek-barang').value = data.detailBarang.merek;
                    document.getElementById('jumlah-koli').value = data.detailBarang.jumlahKoli;
                    document.getElementById('berat-barang').value = data.detailBarang.beratKg;
                    
                    // Ubah tampilan ke mode edit
                    formTitle.textContent = `Mengedit Data Resi: ${resi}`;
                    submitButton.textContent = 'Update Data Resi';
                    nomorResiInput.readOnly = true; // Nomor resi tidak bisa diubah
                    isEditMode = true;
                } else {
                    alert("Resi tidak ditemukan!");
                    window.location.href = 'input_resi.html'; // Kembali ke halaman input baru
                }
            });
        }

        // Cek apakah kita berada di mode EDIT saat halaman dimuat
        if (resiToEdit) {
            loadDataForEdit(resiToEdit);
        }

        // --- LOGIKA SUBMIT FORM (Sekarang bisa handle Simpan & Update) ---
        formResi.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nomorResi = nomorResiInput.value;
            
            // Siapkan objek data dari form
            const dataToSave = {
                nomorResi: nomorResi,
                tanggalKirim: tanggalKirimInput.value,
                pengirim: {
                    nama: document.getElementById('nama-pengirim').value,
                    telepon: document.getElementById('telp-pengirim').value
                },
                penerima: {
                    nama: document.getElementById('nama-penerima').value,
                    telepon: document.getElementById('telp-penerima').value
                },
                detailBarang: {
                    merek: document.getElementById('merek-barang').value,
                    deskripsi: document.getElementById('isi-barang').value,
                    jumlahKoli: parseInt(document.getElementById('jumlah-koli').value) || 0,
                    beratKg: parseFloat(document.getElementById('berat-barang').value) || 0
                }
            };

            // Jika ini BUKAN mode edit, tambahkan data awal
            if (!isEditMode) {
                dataToSave.status = "Data Dibuat";
                dataToSave.lokasiTerkini = "Kantor Papua";
                dataToSave.riwayatStatus = [{
                    status: "Data Dibuat",
                    lokasi: "Kantor Papua",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }];
            }
            
            // Simpan atau Update data
            db.collection("shipments").doc(nomorResi).set(dataToSave, { merge: true }) // { merge: true } penting agar tidak menghapus field lama
            .then(() => {
                alert(`Data untuk resi ${nomorResi} berhasil di-${isEditMode ? 'update' : 'simpan'}!`);
                if (!isEditMode) {
                    formResi.reset();
                } else {
                    // Mungkin redirect ke halaman lacak atau daftar resi
                    window.location.href = 'lacak.html'; // Contoh redirect setelah update
                }
            }).catch((error) => {
                console.error("Error: ", error);
                alert("Gagal menyimpan data.");
            });
        });
    }
});
