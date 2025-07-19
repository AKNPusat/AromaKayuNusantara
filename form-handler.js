// ===================================================================
// KODE FINAL & LENGKAP UNTUK form-handler.js (DENGAN KALKULASI OTOMATIS)
// ===================================================================
document.addEventListener("DOMContentLoaded", function() {
    // PASTE KONFIGURASI FIREBASE ANDA DI SINI
    const firebaseConfig = { /* ... */ };
    
    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
    const db = firebase.firestore();

    const formResi = document.getElementById('form-resi');
    if (formResi) {
        // --- Ambil semua elemen form ---
        const armadaSelect = document.getElementById('jenis-armada');
        const isiBarangText = document.getElementById('isi-barang');
        const jumlahKoliInput = document.getElementById('jumlah-koli');
        const beratBarangInput = document.getElementById('berat-barang');
        const ongkosKirimInput = document.getElementById('ongkos-kirim');
        const groupKoli = document.getElementById('group-jumlah-koli');
        
        // --- FUNGSI KALKULASI ---
        function kalkulasiOtomatis() {
            const armada = armadaSelect.value;
            const isiBarang = isiBarangText.value;
            let totalKoli = 0;
            let totalBerat = 0;
            let ongkosKirim = 0;

            if (armada === 'kapal') {
                // Kalkulasi untuk Kapal
                const matches = isiBarang.match(/\((\d+)\)/g) || [];
                matches.forEach(match => {
                    totalKoli += parseInt(match.replace('(', '').replace(')', ''));
                });
                
                jumlahKoliInput.value = totalKoli;
                totalBerat = totalKoli * 25;
                beratBarangInput.value = totalBerat;
                ongkosKirim = totalKoli * 1150000;
                
                jumlahKoliInput.readOnly = true;
                beratBarangInput.readOnly = true;
                groupKoli.style.display = 'block';

            } else if (armada === 'pesawat') {
                // Kalkulasi untuk Pesawat
                totalBerat = parseFloat(beratBarangInput.value) || 0;
                ongkosKirim = totalBerat * 150000;

                jumlahKoliInput.value = ''; // Kosongkan koli
                jumlahKoliInput.readOnly = true;
                beratBarangInput.readOnly = false; // Berat bisa diisi manual
                groupKoli.style.display = 'none'; // Sembunyikan field koli
            }
            
            // Format ongkos kirim dengan titik (Rp)
            ongkosKirimInput.value = `Rp ${ongkosKirim.toLocaleString('id-ID')}`;
        }

        // --- Atur Tampilan Awal Form & Event Listener ---
        function updateFormTampilan() {
            const armada = armadaSelect.value;
            if (armada === 'kapal') {
                isiBarangText.placeholder = "Contoh: Dekor(4), KBC(3), Ampas(5)";
                groupKoli.style.display = 'block';
                beratBarangInput.readOnly = true;
            } else if (armada === 'pesawat') {
                isiBarangText.placeholder = "Contoh: Gaharu Super A";
                groupKoli.style.display = 'none';
                beratBarangInput.readOnly = false;
            }
            kalkulasiOtomatis();
        }

        // Panggil saat halaman pertama kali dimuat
        updateFormTampilan();

        // Tambahkan event listener untuk setiap perubahan
        armadaSelect.addEventListener('change', updateFormTampilan);
        isiBarangText.addEventListener('input', kalkulasiOtomatis);
        beratBarangInput.addEventListener('input', kalkulasiOtomatis);
        
        // --- LOGIKA SUBMIT FORM ---
        formResi.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nomorResi = document.getElementById('nomor-resi').value;
            
            // Mengambil nilai akhir sebelum submit
            kalkulasiOtomatis();
            const ongkosKirimValue = parseInt(ongkosKirimInput.value.replace(/[^0-9]/g, '')) || 0;

            db.collection("shipments").doc(nomorResi).set({
                nomorResi: nomorResi,
                tanggalKirim: document.getElementById('tanggal-kirim').value,
                armada: armadaSelect.value,
                pengirim: { /* ... */ },
                penerima: { /* ... */ },
                detailBarang: {
                    merek: document.getElementById('merek-barang').value,
                    deskripsi: isiBarangText.value,
                    jumlahKoli: parseInt(jumlahKoliInput.value) || 0,
                    beratKg: parseFloat(beratBarangInput.value) || 0
                },
                ongkosKirim: ongkosKirimValue,
                status: "Data Dibuat",
                lokasiTerkini: "Kantor Papua"
                // ... (riwayat status bisa ditambahkan di sini)
            }).then(() => {
                alert(`Data untuk resi ${nomorResi} berhasil disimpan!`);
                formResi.reset();
                updateFormTampilan();
            }).catch((error) => {
                console.error("Error: ", error);
                alert("Gagal menyimpan data.");
            });
        });
    }
});

