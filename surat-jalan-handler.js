// ===================================================================
// KODE FINAL SURAT JALAN (BISA MEMBACA DATA LAMA & BARU)
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
                    let hasStokField = data.stok && Object.keys(data.stok).length > 0;

                    if (hasStokField) {
                        // GUNAKAN DATA BARU (DARI FIELD 'stok')
                        itemsToDisplay = data.stok;
                    } else if (data.detailBarang.deskripsi) {
                        // GUNAKAN DATA LAMA (PARSE DARI 'deskripsi')
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
                            
                            // Tampilkan status stok
                            if (stokSaatIni > 0) {
                                stokContainer.innerHTML += `<li><strong>${namaBarang}:</strong> ${stokSaatIni} karung</li>`;
                            } else {
                                stokContainer.innerHTML += `<li><strong style="text-decoration: line-through;">${namaBarang}:</strong> Habis</li>`;
                            }
                            
                            // Selalu tampilkan input field, tapi nonaktifkan jika stok habis
                            inputContainer.innerHTML += `
                                <div class="form-group">
                                    <label for="ambil_${namaBarang}">Jumlah ${namaBarang} yang akan diambil:</label>
                                    <input type="number" id="ambil_${namaBarang}" name="${namaBarang}" min="0" max="${stokSaatIni}" value="0" class="input-ambil" ${stokSaatIni === 0 ? 'disabled' : ''}>
                                </div>
                            `;
                        }
                        if (!hasStokField) {
                            stokContainer.innerHTML += '<li style="color: orange; font-style: italic;">Info: Ini adalah data lama. Stok awal ditampilkan.</li>';
                        }
                    } else {
                        stokContainer.innerHTML = '<p style="color: red;">Data item barang tidak dapat ditemukan di resi ini.</p>';
                    }
                    
                    stokContainer.innerHTML += '</ul>';
                    document.getElementById('tahap-2-detail-barang').style.display = 'block';

                } else {
                    alert('Resi tidak ditemukan!');
                }
            });
        });
    }

    // --- (Sisa kode untuk formPengambilan dan generateSuratJalan tidak berubah) ---
});
