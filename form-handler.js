// ===================================================================
// KODE FINAL & LENGKAP UNTUK form-handler.js
// (MENGGABUNGKAN INPUT, EDIT, DAN KALKULASI OTOMATIS)
// ===================================================================

document.addEventListener("DOMContentLoaded", function() {
    // PASTE KONFIGURASI FIREBASE ANDA DI SINI
    const firebaseConfig = {
        apiKey: "AIzaSyDDJpU3mzKY2s-pihTz0XmL1BcrfTS_vRQ",
        authDomain: "aroma-kayu-nusantara.firebaseapp.com",
        projectId: "aroma-kayu-nusantara",
        storageBucket: "aroma-kayu-nusantara.firebasestorage.app",
        messagingSenderId: "519933206110",
        appId: "1:519933206110:web:1620a50af9f88c56f2decf"
    };
    
    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
    const db = firebase.firestore();

    const formResi = document.getElementById('form-resi');
    if (formResi) {
        // --- Ambil semua elemen form ---
        const nomorResiInput = document.getElementById('nomor-resi');
        const tanggalKirimInput = document.getElementById('tanggal-kirim');
        const armadaSelect = document.getElementById('jenis-armada');
        const isiBarangText = document.getElementById('isi-barang');
        const merekInput = document.getElementById('merek-barang');
        const jumlahKoliInput = document.getElementById('jumlah-koli');
        const beratBarangInput = document.getElementById('berat-barang');
        const ongkosKirimInput = document.getElementById('ongkos-kirim');
        const groupKoli = document.getElementById('group-jumlah-koli');
        const groupMerek = document.getElementById('group-merek');
        const submitButton = formResi.querySelector('.submit-button');
        const formTitle = document.getElementById('form-title');

        let isEditMode = false;

        // --- FUNGSI KALKULASI OTOMATIS ---
        function kalkulasiOtomatis() {
            const armada = armadaSelect.value;
            const isiBarang = isiBarangText.value;
            let totalKoli = 0;
            let totalBerat = 0;
            let ongkosKirim = 0;

            if (armada === 'kapal') {
                const matches = isiBarang.match(/\(\s*\d+/g) || [];
                matches.forEach(match => {
                    totalKoli += parseInt(match.replace('(', '').trim());
                });
                jumlahKoliInput.value = totalKoli;
                totalBerat = totalKoli * 25;
                beratBarangInput.value = totalBerat;
                ongkosKirim = totalKoli * 1150000;
            } else if (armada === 'pesawat') {
                totalBerat = parseFloat(beratBarangInput.value) || 0;
                ongkosKirim = totalBerat * 150000;
            }
            ongkosKirimInput.value = `Rp ${ongkosKirim.toLocaleString('id-ID')}`;
        }

        // --- FUNGSI TAMPILAN FORM DINAMIS ---
        function updateFormTampilan() {
            const armada = armadaSelect.value;
            if (armada === 'kapal') {
                isiBarangText.placeholder = "Contoh: Dekor(4), KBC(3), Ampas(5)";
                groupKoli.style.display = 'block';
                groupMerek.style.display = 'block';
                beratBarangInput.readOnly = true;
            } else if (armada === 'pesawat') {
                isiBarangText.placeholder = "Contoh: Gaharu Super A";
                groupKoli.style.display = 'none';
                groupMerek.style.display = 'none';
                beratBarangInput.readOnly = false;
                if (!isEditMode) beratBarangInput.value = '';
            }
            kalkulasiOtomatis();
        }

        // --- FUNGSI UNTUK MODE EDIT ---
        function loadDataForEdit(resi) {
            db.collection("shipments").doc(resi).get().then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    nomorResiInput.value = data.nomorResi;
                    tanggalKirimInput.value = data.tanggalKirim;
                    armadaSelect.value = data.armada || 'kapal';
                    document.getElementById('nama-pengirim').value = data.pengirim.nama;
                    document.getElementById('telp-pengirim').value = data.pengirim.telepon;
                    document.getElementById('nama-penerima').value = data.penerima.nama;
                    document.getElementById('telp-penerima').value = data.penerima.telepon;
                    isiBarangText.value = data.detailBarang.deskripsi;
                    merekInput.value = data.detailBarang.merek;
                    
                    formTitle.textContent = `Mengedit Data Resi: ${resi}`;
                    submitButton.textContent = 'Update Data';
                    nomorResiInput.readOnly = true;
                    isEditMode = true;
                    updateFormTampilan();
                } else {
                    alert("Resi tidak ditemukan!");
                }
            });
        }

        // --- Event Listener untuk Pencarian Edit ---
        const formCariEdit = document.getElementById('form-cari-edit');
        if (formCariEdit) {
            formCariEdit.addEventListener('submit', function(e) {
                e.preventDefault();
                const resiToEdit = document.getElementById('resi-untuk-edit').value.trim();
                if (resiToEdit) {
                    loadDataForEdit(resiToEdit);
                } else {
                    alert("Masukkan nomor resi yang ingin diedit.");
                }
            });
        }

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
