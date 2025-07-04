// =================================================================
// PASTE KONFIGURASI FIREBASE ANDA DARI NOTEPAD DI SINI
// Ini adalah bagian yang Anda salin dari Firebase tadi.
// Pastikan ini adalah kode ASLI Anda.
// =================================================================
const firebaseConfig = {
  apiKey: "AIzaSyDDJpU3mzKY2s-pihTz0XML1BcrfTS_vRQ", // <-- Ganti dengan kode asli Anda jika berbeda
  authDomain: "aroma-kayu-nusantara.firebaseapp.com",
  projectId: "aroma-kayu-nusantara",
  storageBucket: "aroma-kayu-nusantara.firebasestorage.app",
  messagingSenderId: "519933206110",
  appId: "1:519933206110:web:1620a50af9f88c56f2decf"
};

// =================================================================
// INI ADALAH KODE TAMBAHAN DARI SAYA
// =================================================================
// Inisialisasi Firebase dengan cara yang kompatibel
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Inisialisasi Firestore

// Menangani submit form
document.getElementById('form-resi').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah form reload halaman

    // Mengambil nilai dari setiap input
    const nomorResi = document.getElementById('nomor-resi').value;
    const tanggalKirim = document.getElementById('tanggal-kirim').value;
    const namaPengirim = document.getElementById('nama-pengirim').value;
    const telpPengirim = document.getElementById('telp-pengirim').value;
    const namaPenerima = document.getElementById('nama-penerima').value;
    const telpPenerima = document.getElementById('telp-penerima').value;
    const isiBarang = document.getElementById('isi-barang').value;
    const jumlahKoli = parseInt(document.getElementById('jumlah-koli').value);
    const beratBarang = document.getElementById('berat-barang').value;

    // Membuat data untuk disimpan ke Firestore
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
            beratKg: beratBarang ? parseFloat(beratBarang) : 0
        },
        status: "Data Dibuat",
        lokasiTerkini: "Kantor Papua",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert(`Data untuk resi ${nomorResi} berhasil disimpan!`);
        document.getElementById('form-resi').reset();
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
        alert("Gagal menyimpan data. Cek console untuk error.");
    });
});
