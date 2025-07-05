// ===================================================================
// KODE UNTUK MENANGANI FORM - Aroma Kayu Nusantara
// ===================================================================

document.addEventListener("DOMContentLoaded", function() {
    
    // Hanya jalankan kode ini jika kita berada di halaman yang memiliki #form-resi
    const formResi = document.getElementById('form-resi');
    if (formResi) {
        
        // --- 1. Inisialisasi Firebase ---
        // KONFIGURASI FIREBASE ANDA SUDAH SAYA MASUKKAN DI SINI
        const firebaseConfig = {
          apiKey: "AIzaSyDDJpU3mzKY2s-pihTz0XmL1BcrfTS_vRQ",
          authDomain: "aroma-kayu-nusantara.firebaseapp.com",
          projectId: "aroma-kayu-nusantara",
          storageBucket: "aroma-kayu-nusantara.firebasestorage.app",
          messagingSenderId: "519933206110",
          appId: "1:519933206110:web:1620a50af9f88c56f2decf"
        };
        
        // Cek apakah Firebase sudah diinisialisasi sebelumnya
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        const db = firebase.firestore();

        // --- 2. Event Listener untuk Submit Form ---
        formResi.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah halaman reload
            
            // Mengambil semua data dari form
            const nomorResi = document.getElementById('nomor-resi').value;
            const tanggalKirim = document.getElementById('tanggal-kirim').value;
            const namaPengirim = document.getElementById('nama-pengirim').value;
            const telpPengirim = document.getElementById('telp-pengirim').value;
            const namaPenerima = document.getElementById('nama-penerima').value;
            const telpPenerima = document.getElementById('telp-penerima').value;
            const isiBarang = document.getElementById('isi-barang').value;
            const jumlahKoli = parseInt(document.getElementById('jumlah-koli').value);
            const beratBarang = parseFloat(document.getElementById('berat-barang').value) || 0;

            // Simpan ke database Firestore
            db.collection("shipments").doc(nomorResi).set({
                nomorResi: nomorResi,
                tanggalKirim: tanggalKirim,
                pengirim: {
                    nama: namaPengirim,
                    telepon: telpPengirim
                },
                penerima: {
                    nama: namaPenerima,
                    telepon: telpPenerima
                },
                 detailBarang: {
                    deskripsi: isiBarang,
                    jumlahKoli: jumlahKoli,
                    beratKg: beratBarang
                },
                status: "Data Dibuat",
                lokasiTerkini: "Kantor Papua",
                riwayatStatus: [
                    {
                        status: "Data Dibuat",
                        lokasi: "Kantor Papua",
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }
                ]
            })
            .then(() => {
                alert(`Data untuk resi ${nomorResi} berhasil disimpan!`);
                formResi.reset(); // Mengosongkan form setelah berhasil
            })
            .catch((error) => {
                console.error("Error saat menyimpan data: ", error);
                alert("Gagal menyimpan data. Silakan cek konsol untuk detail error.");
            });
        });
    }
});
