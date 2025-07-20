// ===================================================================
// KODE UNTUK SURAT JALAN
// ===================================================================

document.addEventListener("DOMContentLoaded", function() {
    
    const firebaseConfig = { /* ... PASTE KONFIGURASI FIREBASE ANDA DI SINI ... */ };
    
    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
    const db = firebase.firestore();
    
    let dataPengirimanSaatIni = null;

    // --- HANDLER UNTUK FORM CARI RESI ---
    const formCari = document.getElementById('form-cari-surat-jalan');
    if (formCari) {
        formCari.addEventListener('submit', function(e) {
            e.preventDefault();
            const nomorResi = document.getElementById('nomor-resi-sj').value.trim();
            
            db.collection("shipments").doc(nomorResi).get().then(doc => {
                if (doc.exists) {
                    dataPengirimanSaatIni = doc.data();
                    const data = dataPengirimanSaatIni;
                    
                    document.getElementById('nomor-resi-display').textContent = data.nomorResi;
                    
                    const stokContainer = document.getElementById('stok-barang-container');
                    const inputContainer = document.getElementById('input-pengambilan-container');
                    stokContainer.innerHTML = '<ul>';
                    inputContainer.innerHTML = '';

                    const stokItems = data.stok || {};
                    if (Object.keys(stokItems).length === 0) {
                        const deskripsiItems = data.detailBarang.deskripsi.split(',').map(item => item.trim());
                        deskripsiItems.forEach(item => {
                            const match = item.match(/(.+)\((\d+)\)/);
                            if (match) stokItems[match[1].trim()] = parseInt(match[2]);
                        });
                    }

                    for (const namaBarang in stokItems) {
                        const stokSaatIni = stokItems[namaBarang];
                        if (stokSaatIni > 0) {
                            stokContainer.innerHTML += `<li><strong>${namaBarang}:</strong> ${stokSaatIni} karung</li>`;
                            inputContainer.innerHTML += `<div class="form-group"><label for="ambil_${namaBarang}">Jumlah ${namaBarang} yang diambil:</label><input type="number" id="ambil_${namaBarang}" name="${namaBarang}" min="0" max="${stokSaatIni}" value="0" class="input-ambil"></div>`;
                        } else {
                            stokContainer.innerHTML += `<li><strong style="text-decoration: line-through;">${namaBarang}:</strong> Habis</li>`;
                        }
                    }
                    stokContainer.innerHTML += '</ul>';
                    document.getElementById('tahap-2-detail-barang').style.display = 'block';

                } else {
                    alert('Resi tidak ditemukan!');
                }
            });
        });
    }

    // --- HANDLER UNTUK FORM PENGAMBILAN BARANG ---
    const formPengambilan = document.getElementById('form-pengambilan-barang');
    if(formPengambilan) {
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
                    updateStok[`stok.${input.name}`] = dataPengirimanSaatIni.stok[input.name] - jumlahAmbil;
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
            .then(() => db.collection("shipments").doc(nomorResi).update(updateStok))
            .then(() => {
                alert("Surat jalan berhasil dibuat dan stok diperbarui!");
                generateSuratJalan(suratJalanData);
                formPengambilan.reset();
                document.getElementById('tahap-2-detail-barang').style.display = 'none';
            })
            .catch(error => { console.error("Error: ", error); alert("Terjadi kesalahan!"); });
        });
    }

    function generateSuratJalan(data) {
        let itemRows = '';
        data.items.forEach((item, index) => {
            itemRows += `<tr><td>${index + 1}</td><td>${item.nama}</td><td>${item.jumlah} Karung</td></tr>`;
        });
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html><head><title>Surat Jalan - ${data.nomorResi}</title>
            <style> /* ... (style surat jalan sama seperti sebelumnya) ... */ </style>
            </head><body onload="window.print();">
                <div class="container">
                    <h1>SURAT JALAN</h1>
                    <p><strong>No. Dokumen:</strong> ${data.id}</p>
                    <p><strong>No. Resi Induk:</strong> ${data.nomorResi}</p>
                    <p><strong>Diterima Oleh (sesuai resi):</strong> ${data.penerimaAsli}</p>
                    <hr>
                    <p><strong>Nama Pengambil:</strong> ${data.pengambil.nama}</p>
                    <p><strong>No. Kendaraan:</strong> ${data.pengambil.kendaraan}</p>
                    <table><thead><tr><th>No</th><th>Nama Barang</th><th>Jumlah</th></tr></thead><tbody>${itemRows}</tbody></table>
                    <div class="signatures">
                        <div><p>Hormat Kami,</p><br><br><p>(___________)</p><p>Kepala Gudang</p></div>
                        <div><p>Penerima,</p><br><br><p>(___________)</p><p>${data.pengambil.nama}</p></div>
                    </div>
                </div></body></html>
        `);
        printWindow.document.close();
    }
});
