// ===================================================================
// KODE SURAT JALAN - MENGGUNAKAN LOGIKA PENCARIAN YANG SUDAH TERBUKTI
// ===================================================================

document.addEventListener("DOMContentLoaded", function() {
    
    // --- Inisialisasi Firebase (sama persis seperti form-handler.js) ---
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

    let dataPengirimanSaatIni = null;

    // --- FUNGSI UNTUK MENCARI & MENAMPILKAN DATA (Meniru 'loadDataForEdit') ---
    function loadDataForSuratJalan(resi) {
        db.collection("shipments").doc(resi).get().then((doc) => {
            if (doc.exists) {
                dataPengirimanSaatIni = doc.data(); // Simpan data untuk digunakan nanti
                const data = dataPengirimanSaatIni;

                // Tampilkan detail dasar
                document.getElementById('nomor-resi-display').textContent = data.nomorResi;
                
                const stokContainer = document.getElementById('stok-barang-container');
                const inputContainer = document.getElementById('input-pengambilan-container');
                stokContainer.innerHTML = '<ul>';
                inputContainer.innerHTML = '';

                // Logika untuk mendapatkan daftar item (dari stok atau deskripsi)
                let stokItems = {};
                if (data.stok && Object.keys(data.stok).length > 0) {
                    stokItems = data.stok;
                } else if (data.detailBarang.deskripsi) {
                    const deskripsiItems = data.detailBarang.deskripsi.split(',');
                    deskripsiItems.forEach(item => {
                        const match = item.match(/(.+)\((\d+)\)/);
                        if (match) stokItems[match[1].trim()] = parseInt(match[2]);
                    });
                }
                
                // Tampilkan stok dan buat input field
                for (const namaBarang in stokItems) {
                    const stokSaatIni = stokItems[namaBarang];
                    if (stokSaatIni > 0) {
                        stokContainer.innerHTML += `<li><strong>${namaBarang}:</strong> ${stokSaatIni} karung</li>`;
                        inputContainer.innerHTML += `<div class="form-group"><label>Jumlah ${namaBarang} diambil:</label><input type="number" name="${namaBarang}" class="input-ambil" min="0" max="${stokSaatIni}" value="0"></div>`;
                    }
                }
                stokContainer.innerHTML += '</ul>';
                document.getElementById('tahap-2-detail-barang').style.display = 'block';

            } else {
                alert("Resi tidak ditemukan!");
            }
        }).catch(error => {
            console.error("Error saat mencari data: ", error);
            alert("Terjadi kesalahan. Cek console.");
        });
    }

    // --- Event Listener untuk Form Pencarian ---
    const formCari = document.getElementById('form-cari-surat-jalan');
    if (formCari) {
        formCari.addEventListener('submit', function(e) {
            e.preventDefault();
            const resiToLoad = document.getElementById('nomor-resi-sj').value.trim();
            if (resiToLoad) {
                loadDataForSuratJalan(resiToLoad);
            } else {
                alert("Masukkan nomor resi.");
            }
        });
    }

    // --- (Kode untuk form pengambilan dan generate surat jalan tetap di sini, tidak berubah) ---
    // Pastikan kode ini juga ada di dalam file Anda.
});
