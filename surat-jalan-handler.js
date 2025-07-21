// ===================================================================
// KODE SURAT JALAN - MENGGABUNGKAN KODE ANDA DENGAN BAGIAN YANG HILANG
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

    // ========================================================
    // --- BAGIAN YANG DITAMBAHKAN KEMBALI ---
    // ========================================================
   const formPengambilan = document.getElementById('form-pengambilan-barang');
if(formPengambilan) {
    formPengambilan.addEventListener('submit', function(e){
        e.preventDefault();
        
        // ===============================================
        // BUKA JENDELA KOSONG TERLEBIH DAHULU
        // ===============================================
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Mencetak Surat Jalan...</title></head><body><p>Harap tunggu, sedang memproses data...</p></body></html>');

        const nomorResi = document.getElementById('nomor-resi-sj').value;
        const namaPengambil = document.getElementById('nama-pengambil').value;
        const kendaraanPengambil = document.getElementById('kendaraan-pengambil').value;
        
        const itemDiambil = [];
        const updateStok = {};

        document.querySelectorAll('.input-ambil').forEach(input => {
            const jumlahAmbil = parseInt(input.value);
            if(jumlahAmbil > 0) {
                const namaBarang = input.name;
                itemDiambil.push({ nama: namaBarang, jumlah: jumlahAmbil });
                const stokSekarang = stokAwalItems[namaBarang] || 0;
                updateStok[`stok.${namaBarang}`] = stokSekarang - jumlahAmbil;
            }
        });

        if(itemDiambil.length === 0) {
            alert('Tidak ada barang yang diambil!');
            printWindow.close(); // Tutup jendela kosong jika tidak jadi
            return;
        }

        const suratJalanId = `SJ-${nomorResi}-${Date.now()}`;
        const suratJalanData = {
            id: suratJalanId,
            nomorResi: nomorResi,
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
            
            // ===============================================
            // SEKARANG ISI KONTEN KE JENDELA YANG SUDAH TERBUKA
            // ===============================================
            generateSuratJalan(suratJalanData, printWindow); 
            
            formCari.reset();
            formPengambilan.reset();
            document.getElementById('tahap-2-detail-barang').style.display = 'none';
        })
        .catch(error => {
            console.error("Error: ", error);
            alert("Terjadi kesalahan!");
            printWindow.close(); // Tutup jendela jika ada error
        });
    });
}
