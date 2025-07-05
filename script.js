// script.js - VERSI STABIL
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
    if (!firebaseunggu 5-10 menit.
4.  Lakukan **Hard Refresh (`Ctrl+F5`)**.

Dengan cara ini, kita kembali ke titik di mana semuanya bekerja dengan baik dan tampilannya konsisten. Dari sini, kita bisa melanjutkan.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    // --- Handler Form Input Resi ---
    const formResi = document.getElementById('form-resi');
    if (formResi) {
        formResi.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomorResi = document.getElementById('nomor-resi').value;
            db.collection("shipments").doc(nomorResi).set({
                nomorResi: nomorResi,
                tanggalKirim: document.getElementById('tanggal-kirim').value,
                pengirim: { nama: document.getElementById('nama-pengirim').value, telepon: document.getElementById('telp-pengirim').value },
                penerima: { nama: document.getElementById('nama-penerima').value, telepon: document.getElementById('telp-penerima').value },
                detailBarang: { deskripsi: document.getElementById('isi-barang').value, jumlahKoli: parseInt(document.getElementById('jumlah-koli').value), beratKg: parseFloat(document.getElementById('berat-barang').value) || 0 },
                status: "Data Dibuat", lokasiTerkini: "Kantor lagi dengan lebih hati-hati. Papua"
            }).then(() => {
                alert(`Resi ${nomorResi} berhasil disimpan!`);
                formResi.reset();
            }).catch(err => console.error(err));
        });
    }

    // --- Handler Form Lacak Kiriman ---
    const formLacak = document.getElementById('form-lacak');
    if (formLacak) {
        formLacak.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomorResiLacak = document.getElementById('nomor-resi-lacak').value;
            const hasilDiv = document.getElementById('hasil-lacak');
            hasilDiv
