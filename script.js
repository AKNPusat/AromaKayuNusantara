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
// =================================================================
// KODE BARU UNTUK FUNGSI PELACAKAN
// =================================================================
document.getElementById('form-lacak').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah form reload

    const nomorResiLacak = document.getElementById('nomor-resi-lacak').value;
    const hasilDiv = document.getElementById('hasil-lacak');

    // Tampilkan pesan "Mencari..."
    hasilDiv.innerHTML = '<p>Mencari data untuk resi ' + nomorResiLacak + '...</p>';

    // Ambil data dari Firestore
    db.collection("shipments").doc(nomorResiLacak).get()
        .then((doc) => {
            if (doc.exists) {
                // Jika dokumen ditemukan, tampilkan datanya
                const data = doc.data();
                
                // Format tanggal agar lebih mudah dibaca
                const tanggal = new Date(data.tanggalKirim).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                });

                hasilDiv.innerHTML = `
                    <h3>Detail Kiriman: ${data.nomorResi}</h3>
                    <p><strong>Tanggal Kirim:</strong> ${tanggal}</p>
                    <p><strong>Status Terkini:</strong> <span class="status">${data.status}</span></p>
                    <p><strong>Lokasi Terkini:</strong> ${data.lokasiTerkini}</p>
                    <hr>
                    <h4>Informasi Pengirim</h4>
                    <p><strong>Nama:</strong> ${data.pengirim.nama}</p>
                    <p><strong>Telepon:</strong> ${data.pengirim.telepon}</p>
                    <h4>Informasi Penerima</h4>
                    <p><strong>Nama:</strong> ${data.penerima.nama}</p>
                    <p><strong>Telepon:</strong> ${data.penerima.telepon}</p>
                    <hr>
                    <h4>Detail Barang</h4>
                    <p><strong>Deskripsi:</strong> ${data.detailBarang.deskripsi}</p>
                    <p><strong>Jumlah Koli:</strong> ${data.detailBarang.jumlahKoli} koli</p>
                    <p><strong>Berat:</strong> ${data.detailBarang.beratKg > 0 ? data.detailBarang.beratKg + ' kg' : 'Tidak diisi'}</p>
                `;
            } else {
                // Jika dokumen tidak ditemukan
                hasilDiv.innerHTML = '<p style="color: red;">Data untuk resi ' + nomorResiLacak + ' tidak ditemukan.</p>';
            }
        })
        .catch((error) => {
            console.error("Error getting document:", error);
            hasilDiv.innerHTML = '<p style="color: red;">Terjadi kesalahan saat mencari data.</p>';
        });
});
