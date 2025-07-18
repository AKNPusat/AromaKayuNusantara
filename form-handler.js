// ===================================================================
// KODE LENGKAP UNTUK form-handler.js (TERMASUK MEREK)
// ===================================================================

document.addEventListener("DOMContentLoaded", function() {
    
    // --- Inisialisasi Firebase (Hanya sekali) ---
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

    // ========================================================
    // --- HANDLER UNTUK FORM INPUT RESI ---
    // ========================================================
    const formResi = document.getElementById('form-resi');
    if (formResi) {
        formResi.addEventListener('submit', function(e) {
            e.preventDefault();

            // Mengambil semua nilai dari form
            const nomorResi = document.getElementById('nomor-resi').value;
            const tanggalKirim = document.getElementById('tanggal-kirim').value;
            const namaPengirim = document.getElementById('nama-pengirim').value;
            const telpPengirim = document.getElementById('telp-pengirim').value;
            const namaPenerima = document.getElementById('nama-penerima').value;
            const telpPenerima = document.getElementById('telp-penerima').value;
            const isiBarang = document.getElementById('isi-barang').value;
            const jumlahKoli = parseInt(document.getElementById('jumlah-koli').value);
            const beratBarang = parseFloat(document.getElementById('berat-barang').value) || 0;
            
            // =============================================
            // PENAMBAHAN KODE UNTUK MENGAMBIL NILAI "MEREK"
            // =============================================
            const merekBarang = document.getElementById('merek-barang').value;

            // Menyimpan data ke Firestore
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
                    beratKg: beratBarang,
                    // =============================================
                    // PENAMBAHAN DATA "MEREK" DISIMPAN DI SINI
                    // =============================================
                    merek: merekBarang 
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
            }).then(() => {
                alert(`Data untuk resi ${nomorResi} berhasil disimpan!`);
                formResi.reset();
            }).catch((error) => {
                console.error("Error: ", error);
                alert("Gagal menyimpan data.");
            });
        });
    }

    // ========================================================
    // --- HANDLER UNTUK FORM LACAK KIRIMAN (TIDAK DIUBAH) ---
    // ========================================================
    const formLacak = document.getElementById('form-lacak');
    if (formLacak) {
        formLacak.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomorResiLacak = document.getElementById('nomor-resi-lacak').value;
            const hasilDiv = document.getElementById('hasil-lacak');
            hasilDiv.innerHTML = '<p>Mencari data untuk resi ' + nomorResiLacak + '...</p>';

            db.collection("shipments").doc(nomorResiLacak).get().then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    const tanggal = new Date(data.tanggalKirim).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
                    
                    let riwayatHtml = '<ul>';
                    if (data.riwayatStatus && Array.isArray(data.riwayatStatus)) {
                        data.riwayatStatus.slice().reverse().forEach(item => {
                            const riwayatTanggal = item.timestamp.toDate().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });
                            riwayatHtml += `<li><strong>${item.status}</strong> di ${item.lokasi} (${riwayatTanggal})</li>`;
                        });
                    }
                    riwayatHtml += '</ul>';

                    hasilDiv.innerHTML = `
                        <h3>Hasil untuk Resi: ${data.nomorResi}</h3>
                        <p><strong>Status Terkini:</strong> ${data.status}</p>
                        <p><strong>Lokasi Terkini:</strong> ${data.lokasiTerkini}</p>
                        <p><strong>Tanggal Kirim:</strong> ${tanggal}</p>
                        <hr>
                        <h4>Riwayat Perjalanan:</h4>
                        ${riwayatHtml}
                        <hr>
                        <h4>Detail Pengirim:</h4>
                        <p>Nama: ${data.pengirim.nama}, Telp: ${data.pengirim.telepon}</p>
                        <h4>Detail Penerima:</h4>
                        <p>Nama: ${data.penerima.nama}, Telp: ${data.penerima.telepon}</p>
                        <h4>Detail Barang:</h4>
                        <p>${data.detailBarang.deskripsi}</p>
                    `;
                } else {
                    hasilDiv.innerHTML = '<p style="color: red;">Data untuk resi ' + nomorResiLacak + ' tidak ditemukan.</p>';
                }
            }).catch((error) => {
                console.error("Error: ", error);
                hasilDiv.innerHTML = '<p style="color: red;">Terjadi kesalahan saat mencari data.</p>';
            });
        });
    }
});
