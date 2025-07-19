// ===================================================================
// KODE FINAL & LENGKAP UNTUK form-handler.js (DENGAN KALKULASI OTOMATIS)
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
        const armadaSelect = document.getElementById('jenis-armada');
        const isiBarangText = document.getElementById('isi-barang');
        const jumlahKoliInput = document.getElementById('jumlah-koli');
        const beratBarangInput = document.getElementById('berat-barang');
        const ongkosKirimInput = document.getElementById('ongkos-kirim');
        const groupKoli = document.getElementById('group-jumlah-koli');
        const merekInput = document.getElementById('merek-barang');
        const groupMerek = merekInput.parentElement;
        
        // --- FUNGSI KALKULASI ---
        function kalkulasiOtomatis() {
            const armada = armadaSelect.value;
            const isiBarang = isiBarangText.value;
            let totalKoli = 0;
            let totalBerat = 0;
            let ongkosKirim = 0;

            if (armada === 'kapal') {
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

            } else if (armada === 'pesawat') {
                totalBerat = parseFloat(beratBarangInput.value) || 0;
                ongkosKirim = totalBerat * 150000;
            }
            
            ongkosKirimInput.value = `Rp ${ongkosKirim.toLocaleString('id-ID')}`;
        }

        // --- Atur Tampilan Awal Form & Event Listener ---
        function updateFormTampilan() {
            const armada = armadaSelect.value;
            if (armada === 'kapal') {
                isiBarangText.placeholder = "Contoh: Dekor(4), KBC(3), Ampas(5)";
                groupKoli.style.display = 'block';
                beratBarangInput.readOnly = true;
                groupMerek.style.display = 'block';
            } else if (armada === 'pesawat') {
                isiBarangText.placeholder = "Contoh: Gaharu Super A";
                groupKoli.style.display = 'none';
                beratBarangInput.readOnly = false;
                groupMerek.style.display = 'none';
            }
            kalkulasiOtomatis();
        }

        updateFormTampilan();
        armadaSelect.addEventListener('change', updateFormTampilan);
        isiBarangText.addEventListener('input', kalkulasiOtomatis);
        beratBarangInput.addEventListener('input', kalkulasiOtomatis);
        
        // --- LOGIKA SUBMIT FORM ---
        formResi.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nomorResi = document.getElementById('nomor-resi').value;
            
            // ==========================================================
            // MENGAMBIL NILAI PENGIRIM & PENERIMA YANG HILANG
            // ==========================================================
            const namaPengirim = document.getElementById('nama-pengirim').value;
            const telpPengirim = document.getElementById('telp-pengirim').value;
            const namaPenerima = document.getElementById('nama-penerima').value;
            const telpPenerima = document.getElementById('telp-penerima').value;

            kalkulasiOtomatis();
            const ongkosKirimValue = parseInt(ongkosKirimInput.value.replace(/[^0-9]/g, '')) || 0;

            db.collection("shipments").doc(nomorResi).set({
                nomorResi: nomorResi,
                tanggalKirim: document.getElementById('tanggal-kirim').value,
                armada: armadaSelect.value,
                
                // ==========================================================
                // MENYIMPAN DATA PENGIRIM & PENERIMA KE DATABASE
                // ==========================================================
                pengirim: {
                    nama: namaPengirim,
                    telepon: telpPengirim
                },
                penerima: {
                    nama: namaPenerima,
                    telepon: telpPenerima
                },
                
                detailBarang: {
                    merek: document.getElementById('merek-barang').value,
                    deskripsi: isiBarangText.value,
                    jumlahKoli: parseInt(jumlahKoliInput.value) || 0,
                    beratKg: parseFloat(beratBarangInput.value) || 0
                },
                ongkosKirim: ongkosKirimValue,
                status: "Data Dibuat",
                lokasiTerkini: "Kantor Papua"
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
