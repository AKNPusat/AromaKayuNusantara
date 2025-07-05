// ===================================================================
// KODE UNTUK SURAT JALAN - Aroma Kayu Nusantara
// ===================================================================

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
    
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    // ========================================================
    // --- HANDLER UNTUK FORM CARI RESI ---
    // ========================================================
    const formCari = document.getElementById('form-cari-surat-jalan');
    if (formCari) {
        formCari.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomorResi = document.getElementById('nomor-resi-sj').value;
            
            db.collection("shipments").doc(nomorResi).get().then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    // Tampilkan data ke Tahap 2
                    document.getElementById('nomor-resi-display').textContent = data.nomorResi;
                    document.getElementById('deskripsi-asli').textContent = data.detailBarang.deskripsi;
                    
                    // Proses deskripsi menjadi item stok
                    const stokContainer = document.getElementById('stok-barang-container');
                    const inputContainer = document.getElementById('input-pengambilan-container');
                    stokContainer.innerHTML = '';
                    inputContainer.innerHTML = '';

                    const deskripsiItems = data.detailBarang.deskripsi.split(',').map(item => item.trim());
                    
                    deskripsiItems.forEach(item => {
                        const match = item.match(/(.+)\((\d+)\)/);
                        if (match) {
                            const namaBarang = match[1];
                            const jumlahAwal = parseInt(match[2]);
                            
                            // Cek stok saat ini di database (atau gunakan jumlah awal jika belum ada)
                            const stokSaatIni = data.stok && data.stok[namaBarang] !== undefined ? data.stok[namaBarang] : jumlahAwal;

                            stokContainer.innerHTML += `<p><strong>${namaBarang}:</strong> ${stokSaatIni} karung</p>`;
                            
                            // Buat input untuk pengambilan
                            inputContainer.innerHTML += `
                                <div class="form-group">
                                    <label for="ambil_${namaBarang}">Jumlah ${namaBarang} yang diambil</label>
                                    <input type="number" id="ambil_${namaBarang}" name="${namaBarang}" min="0" max="${stokSaatIni}" value="0" class="input-ambil">
                                </div>
                            `;
                        }
                    });

                    document.getElementById('tahap-2-detail-barang').style.display = 'block';

                } else {
                    alert('Resi tidak ditemukan!');
                }
            });
        });
    }

    // ========================================================
    // --- HANDLER UNTUK FORM PENGAMBILAN BARANG ---
    // ========================================================
    const formPengambilan = document.getElementById('form-pengambilan-barang');
    if(formPengambilan) {
        formPengambilan.addEventListener('submit', function(e){
            e.preventDefault();
            const nomorResi = document.getElementById('nomor-resi-sj').value;
            const namaPengambil = document.getElementById('nama-pengambil').value;
            const kendaraanPengambil = document.getElementById('kendaraan-pengambil').value;
            
            const itemDiambil = [];
            const inputAmbilElements = document.querySelectorAll('.input-ambil');
            
            const updateStok = {};

            inputAmbilElements.forEach(input => {
                const jumlahAmbil = parseInt(input.value);
                if(jumlahAmbil > 0) {
                    itemDiambil.push({
                        nama: input.name,
                        jumlah: jumlahAmbil
                    });
                    // Siapkan data untuk update stok
                    const stokSekarang = parseInt(input.max);
                    updateStok[`stok.${input.name}`] = stokSekarang - jumlahAmbil;
                }
            });

            if(itemDiambil.length === 0) {
                alert('Tidak ada barang yang diambil!');
                return;
            }

            // Update stok di Firestore
            db.collection("shipments").doc(nomorResi).update(updateStok)
            .then(() => {
                // Generate Surat Jalan untuk di-print
                generateSuratJalan(nomorResi, namaPengambil, kendaraanPengambil, itemDiambil);
            })
            .catch(error => {
                console.error("Error updating stock: ", error);
                alert("Gagal mengupdate stok!");
            });
        });
    }

    function generateSuratJalan(resi, pengambil, kendaraan, items) {
        let itemRows = '';
        items.forEach((item, index) => {
            itemRows += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.nama}</td>
                    <td>${item.jumlah} Karung</td>
                </tr>
            `;
        });

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Surat Jalan - ${resi}</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .container { width: 80%; margin: 0 auto; }
                        h1 { text-align: center; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid black; padding: 8px; text-align: left; }
                        .signatures { margin-top: 50px; display: flex; justify-content: space-around; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>SURAT JALAN</h1>
                        <p><strong>No. Resi:</strong> ${resi}</p>
                        <p><strong>Tanggal:</strong> ${new Date().toLocaleDateString('id-ID')}</p>
                        <p><strong>Nama Pengambil:</strong> ${pengambil}</p>
                        <p><strong>No. Kendaraan:</strong> ${kendaraan}</p>
                        <table>
                            <thead>
                                <tr><th>No</th><th>Nama Barang</th><th>Jumlah</th></tr>
                            </thead>
                            <tbody>
                                ${itemRows}
                            </tbody>
                        </table>
                        <div class="signatures">
                            <div><p>Hormat Kami,</p><br><br><p>(___________________)</p><p>Gudang</p></div>
                            <div><p>Penerima,</p><br><br><p>(___________________)</p><p>${pengambil}</p></div>
                        </div>
                    </div>
                    <script>window.print();</script>
                </body>
            </html>
        `);
        printWindow.document.close();
    }
});
