// ===================================================================
// KODE FINAL SURAT JALAN (LEBIH TAHAN BANTING)
// ===================================================================

document.addEventListener("DOMContentLoaded", function() {
    
    // ... (Inisialisasi Firebase tidak berubah) ...
    const firebaseConfig = { /* ... PASTE KONFIGURASI ANDA DI SINI ... */ };
    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
    const db = firebase.firestore();

    let dataPengirimanSaatIni = null;

    const formCari = document.getElementById('form-cari-surat-jalan');
    if (formCari) {
        formCari.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomorResi = document.getElementById('nomor-resi-sj').value.trim();
            if (!nomorResi) return;
            
            db.collection("shipments").doc(nomorResi).get().then(doc => {
                if (doc.exists) {
                    dataPengirimanSaatIni = doc.data();
                    const data = dataPengirimanSaatIni;
                    
                    document.getElementById('nomor-resi-display').textContent = data.nomorResi;
                    document.getElementById('deskripsi-asli').textContent = data.detailBarang.deskripsi;
                    
                    const stokContainer = document.getElementById('stok-barang-container');
                    const inputContainer = document.getElementById('input-pengambilan-container');
                    stokContainer.innerHTML = '<ul>';
                    inputContainer.innerHTML = '';

                    let itemsToDisplay = {};

                    // --- LOGIKA BARU YANG LEBIH FLEKSIBEL ---
                    // Prioritaskan field 'stok' jika ada
                    if (data.stok && Object.keys(data.stok).length > 0) {
                        itemsToDisplay = data.stok;
                    } 
                    // Jika tidak ada field 'stok', coba parse dari 'deskripsi' (untuk data lama)
                    else if (data.detailBarang.deskripsi) {
                        const deskripsiItems = data.detailBarang.deskripsi.split(',').map(item => item.trim());
                        deskripsiItems.forEach(item => {
                            const match = item.match(/(.+)\((\d+)\)/);
                            if (match) {
                                const namaBarang = match[1].trim();
                                const jumlah = parseInt(match[2]);
                                itemsToDisplay[namaBarang] = jumlah;
                            }
                        });
                    }

                    // Tampilkan item yang ditemukan
                    if (Object.keys(itemsToDisplay).length > 0) {
                        for (const namaBarang in itemsToDisplay) {
                            const stokSaatIni = itemsToDisplay[namaBarang];
                            if (stokSaatIni > 0) {
                                stokContainer.innerHTML += `<li><strong>${namaBarang}:</strong> ${stokSaatIni} karung</li>`;
                                inputContainer.innerHTML += `
                                    <div class="form-group">
                                        <label for="ambil_${namaBarang}">Jumlah ${namaBarang} yang diambil:</label>
                                        <input type="number" id="ambil_${namaBarang}" name="${namaBarang}" min="0" max="${stokSaatIni}" value="0" class="input-ambil">
                                    </div>
                                `;
                            } else {
                                stokContainer.innerHTML += `<li><strong style="text-decoration: line-through;">${namaBarang}:</strong> Habis</li>`;
                            }
                        }
                        document.getElementById('tahap-2-detail-barang').style.display = 'block';
                    } else {
                        stokContainer.innerHTML = '<p>Tidak ada detail item barang yang bisa diproses.</p>';
                        document.getElementById('tahap-2-detail-barang').style.display = 'block';
                    }
                    
                    stokContainer.innerHTML += '</ul>';

                } else {
                    alert('Resi tidak ditemukan!');
                }
            }).catch(error => {
                console.error("Error saat mencari resi: ", error);
                alert("Terjadi kesalahan. Cek console untuk detail.");
            });
        });
    }

    // --- (Sisa kode untuk formPengambilan dan generateSuratJalan tidak berubah) ---
});
