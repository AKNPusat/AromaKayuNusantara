// ===================================================================
// KODE SURAT JALAN ANDA - DENGAN PENAMBAHAN LOGO PADA PRINT
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

    let dataPengirimanSaatIni = null;
    let stokAwalItems = {};

    function loadDataForSuratJalan(resi) {
        // ... (Fungsi ini tidak diubah sama sekali)
        db.collection("shipments").doc(resi).get().then((doc) => {
            if (doc.exists) {
                dataPengirimanSaatIni = doc.data();
                const data = dataPengirimanSaatIni;
                stokAwalItems = {};
                
                document.getElementById('nomor-resi-display').textContent = data.nomorResi;
                
                const stokContainer = document.getElementById('stok-barang-container');
                const inputContainer = document.getElementById('input-pengambilan-container');
                stokContainer.innerHTML = '<ul>';
                inputContainer.innerHTML = '';

                if (data.stok && Object.keys(data.stok).length > 0) {
                    stokAwalItems = data.stok;
                } else if (data.detailBarang && data.detailBarang.deskripsi) {
                    const deskripsiItems = data.detailBarang.deskripsi.split(',');
                    deskripsiItems.forEach(item => {
                        const match = item.match(/(.+)\((\d+)\)/);
                        if (match) stokAwalItems[match[1].trim()] = parseInt(match[2]);
                    });
                }
                
                for (const namaBarang in stokAwalItems) {
                    const stokSaatIni = stokAwalItems[namaBarang];
                    stokContainer.innerHTML += `<li><strong>${namaBarang}:</strong> ${stokSaatIni} karung</li>`;
                    if (stokSaatIni > 0) {
                        inputContainer.innerHTML += `<div class="form-group"><label for="ambil_${namaBarang}">Jumlah ${namaBarang} diambil:</label><input type="number" id="ambil_${namaBarang}" name="${namaBarang}" class="input-ambil" min="0" max="${stokSaatIni}" value="0"></div>`;
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

    const formCari = document.getElementById('form-cari-surat-jalan');
    if (formCari) {
        formCari.addEventListener('submit', function(e) {
            e.preventDefault();
            const resiToLoad = document.getElementById('nomor-resi-sj').value.trim();
            if (resiToLoad) {
                loadDataForSuratJalan(resiToLoad);
            }
        });
    }

    const formPengambilan = document.getElementById('form-pengambilan-barang');
    if(formPengambilan) {
        // ... (Fungsi ini tidak diubah sama sekali)
        formPengambilan.addEventListener('submit', function(e){
            e.preventDefault();
            const nomorResi = document.getElementById('nomor-resi-sj').value;
            const namaPengambil = document.getElementById('nama-pengambil').value;
            const kendaraanPengambil = document.getElementById('kendaraan-pengambil').value;
            
            const itemDiambil = [];
            const updateStok = {};

            document.querySelectorAll('.input-ambil').forEach(input => {
                const jumlahAmbil = parseInt(input.value);
                if(jumlahAmbil > 0) {
                    itemDiambil.push({ nama: input.name, jumlah: jumlahAmbil });
                    const stokSekarang = stokAwalItems[input.name] || 0;
                    updateStok[`stok.${input.name}`] = stokSekarang - jumlahAmbil;
                }
            });

            if(itemDiambil.length === 0) {
                alert('Tidak ada barang yang diambil!');
                return;
            }

            const suratJalanId = `SJ-${nomorResi}-${Date.now()}`;
            const suratJalanData = {
                id: suratJalanId, nomorResi: nomorResi,
                tanggalDibuat: firebase.firestore.FieldValue.serverTimestamp(),
                pengambil: { nama: namaPengambil, kendaraan: kendaraanPengambil },
                items: itemDiambil,
                penerimaAsli: dataPengirimanSaatIni.penerima.nama
            };
            
            db.collection("surat_jalan").doc(suratJalanId).set(suratJalanData)
            .then(() => db.collection("shipments").doc(nomorResi).set({ stok: stokAwalItems }, { merge: true }))
            .then(() => db.collection("shipments").doc(nomorResi).update(updateStok))
            .then(() => {
                alert("Surat jalan berhasil dibuat dan stok diperbarui!");
                generateSuratJalan(suratJalanData);
                formCari.reset();
                formPengambilan.reset();
                document.getElementById('tahap-2-detail-barang').style.display = 'none';
            })
            .catch(error => { console.error("Error: ", error); alert("Terjadi kesalahan!"); });
        });
    }

    // ========================================================
    // --- FUNGSI GENERATE SURAT JALAN SUDAH DITAMBAH LOGO ---
    // ========================================================
    function generateSuratJalan(data) {
        let itemRows = '';
        data.items.forEach((item, index) => {
            itemRows += `<tr><td>${index + 1}</td><td>${item.nama}</td><td>${item.jumlah} Karung</td></tr>`;
        });
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Surat Jalan - ${data.nomorResi}</title>
                    <style>
                        body { font-family: Arial, sans-serif; font-size: 11pt; }
                        .container { width: 90%; margin: 0 auto; }
                        .header { text-align: center; border-bottom: 3px double black; padding-bottom: 15px; margin-bottom: 25px; }
                        .logo { max-height: 80px; margin-bottom: 10px; }
                        .header h2 { margin: 0; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid black; padding: 8px; text-align: left; }
                        .signatures { margin-top: 50px; display: flex; justify-content: space-around; text-align: center; }
                    </style>
                </head>
                <body onload="window.print(); window.close();">
                    <div class="container">
                        <div class="header">
                            <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/main/logo%20AROMA%20kayu.png" alt="Logo" class="logo">
                            <h2>SURAT JALAN</h2>
                        </div>
                        <p><strong>No. Dokumen:</strong> ${data.id}</p>
                        <p><strong>No. Resi Induk:</strong> ${data.nomorResi}</p>
                        <p><strong>Diterima Oleh (sesuai resi):</strong> ${data.penerimaAsli}</p>
                        <p><strong>Nama Pengambil:</strong> ${data.pengambil.nama}</p>
                        <p><strong>No. Kendaraan:</strong> ${data.pengambil.kendaraan}</p>
                        <table>
                            <thead>
                                <tr><th>No</th><th>Nama Barang</th><th>Jumlah</th></tr>
                            </thead>
                            <tbody>
                                ${itemRows}
                            </tbody>
                        </table>
                        <div class="signatures">
                            <div><p>Hormat Kami,</p><br><br><br><p>(___________________)</p><p><strong>Kepala Gudang</strong></p></div>
                            <div><p>Penerima,</p><br><br><br><p>(___________________)</p><p><strong>${data.pengambil.nama}</strong></p></div>
                        </div>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
    }
});
