// Handler untuk Form Input Resi
document.addEventListener("DOMContentLoaded", function() {
    const formResi = document.getElementById('form-resi');
    if (formResi) {
        
        // --- Inisialisasi Firebase ---
        // GANTI DENGAN KONFIGURASI FIREBASE ANDA
        const firebaseConfig = {
            apiKey: "AIza...",
            authDomain: "...",
            projectId: "...",
            storageBucket: "...",
            messagingSenderId: "...",
            appId: "..."
        };
        const app = firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();

        // --- Event Listener untuk Submit Form ---
        formResi.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil data dari form
            const nomorResi = document.getElementById('nomor-resi').value;
            // ... (ambil semua data lain seperti sebelumnya) ...
            
            // Simpan ke Firestore
            db.collection("shipments").doc(nomorResi).set({
                // ... (struktur data sama seperti sebelumnya) ...
                nomorResi: nomorResi,
                tanggalKirim: document.getElementById('tanggal-kirim').value,
                pengirim: {
                    nama: document.getElementById('nama-pengirim').value,
                    telepon: document.getElementById('telp-pengirim').value
                },
                penerima: {
                    nama: document.getElementById('nama-penerima').value,
                    telepon: document.getElementById('telp-penerima').value
                },
                 detailBarang: {
                    deskripsi: document.getElementById('isi-barang').value,
                    jumlahKoli: parseInt(document.getElementById('jumlah-koli').value),
                    beratKg: parseFloat(document.getElementById('berat-barang').value) || 0
                },
                status: "Data Dibuat",
                lokasiTerkini: "Kantor Papua",
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                alert(`Data untuk resi ${nomorResi} berhasil disimpan!`);
                formResi.reset();
            })
            .catch((error) => {
                console.error("Error: ", error);
                alert("Gagal menyimpan data.");
            });
        });
    }
});
