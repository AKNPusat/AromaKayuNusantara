// ===================================================================
// KODE UNTUK MANAJEMEN STOK - Aroma Kayu Nusantara
// ===================================================================

document.addEventListener("DOMContentLoaded", function() {
    
    // Pastikan kita berada di halaman stok
    if (document.querySelector('#daftar-stok-resi')) {
        
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

        const ringkasanContainer = document.getElementById('ringkasan-total-stok');
        const daftarStokContainer = document.getElementById('daftar-stok-resi');

        // Fungsi untuk mengambil dan menampilkan semua data stok
        function muatDataStok() {
            db.collection("shipments").get().then((querySnapshot) => {
                let htmlDaftar = '';
                const totalStok = {}; // Untuk menghitung total semua jenis barang

                if (querySnapshot.empty) {
                    daftarStokContainer.innerHTML = '<p>Belum ada data pengiriman.</p>';
                    ringkasanContainer.innerHTML = '';
                    return;
                }

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    let detailStokResi = '';
                    let resiMasihAdaStok = false;

                    // Cek stok berdasarkan field 'stok'
                    if (data.stok) {
                        for (const [namaBarang, jumlah] of Object.entries(data.stok)) {
                            if (jumlah > 0) {
                                detailStokResi += `<li>${namaBarang}: <strong>${jumlah}</strong> karung</li>`;
                                resiMasihAdaStok = true;
                                // Akumulasi total stok
                                totalStok[namaBarang] = (totalStok[namaBarang] || 0) + jumlah;
                            }
                        }
                    } else { // Fallback jika field 'stok' belum ada
                         const deskripsiItems = data.detailBarang.deskripsi.split(',').map(item => item.trim());
                         deskripsiItems.forEach(item => {
                            const match = item.match(/(.+)\((\d+)\)/);
                            if(match) {
                                const namaBarang = match[1];
                                const jumlahAwal = parseInt(match[2]);
                                detailStokResi += `<li>${namaBarang}: <strong>${jumlahAwal}</strong> karung (Stok Awal)</li>`;
                                resiMasihAdaStok = true;
                                totalStok[namaBarang] = (totalStok[namaBarang] || 0) + jumlahAwal;
                            }
                         });
                    }

                    // Hanya tampilkan resi yang masih memiliki stok
                    if(resiMasihAdaStok) {
                        htmlDaftar += `
                            <div class="stok-item">
                                <h4>Resi: ${data.nomorResi}</h4>
                                <ul>${detailStokResi}</ul>
                            </div>
                        `;
                    }
                });

                daftarStokContainer.innerHTML = htmlDaftar || '<p>Semua stok sudah habis terambil.</p>';
                
                // Tampilkan ringkasan total stok
                let htmlRingkasan = '<h3>Ringkasan Total Stok di Gudang</h3><div class="ringkasan-grid">';
                for (const [namaBarang, jumlah] of Object.entries(totalStok)) {
                     htmlRingkasan += `<div class="ringkasan-item"><strong>${namaBarang}:</strong><span>${jumlah} karung</span></div>`;
                }
                htmlRingkasan += '</div>';
                ringkasanContainer.innerHTML = htmlRingkasan;

            }).catch(error => {
                console.error("Error getting documents: ", error);
                daftarStokContainer.innerHTML = '<p style="color:red;">Gagal memuat data stok.</p>';
            });
        }

        muatDataStok();
    }
});
