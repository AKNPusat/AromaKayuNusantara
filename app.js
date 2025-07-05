// -- app.js - KEMBALI KE VERSI STABIL --
document.addEventListener("DOMContentLoaded", function() {
    
    // --- TEMPLATE HEADER & FOOTER ---
    const headerHTML = `
        <div class="top-header">
            <div class="header-container">
                <div class="top-links-right">
                    <a href="input_resi.html">Input Resi</a>
                    <a href="surat_jalan.html">Surat Jalan</a>
                    <a href="stok.html">Stok</a>
                    <div class="nav-item-top">
                        <a href="#" class="nav-link-top">Manajemen</a>
                        <div class="dropdown-menu-top">
                            <a href="laporan_keuangan.html">Laporan Keuangan</a>
                            <a href="invoice.html">Invoice</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <header class="main-header">
            <div class="header-container">
                <a href="index.html" class="logo-link">
                    <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/main/logo%20AROMA%20kayu.png" alt="Logo AKN" class="logo">
                </a>
                <nav class="main-nav">
                    <div class="nav-item">
                        <a href="#" class="nav-link">Tentang Kami</a>
                        <div class="dropdown-menu"><a href="sekilas.html">Sekilas AKN</a><a href="visi-misi.html">Visi & Misi</a></div>
                    </div>
                    <div class="nav-item"><a href="bisnis.html" class="nav-link">Bisnis Kami</a></div>
                    <div class="nav-item"><a href="media.html" class="nav-link">Media & Informasi</a></div>
                </nav>
            </div>
        </header>
    `;
    const footerHTML = `<footer class="main-footer"><p>© 2024 PT. Aroma Kayu Nusantara</p></footer>`;

    // --- PROSES MEMASUKKAN HEADER & FOOTER ---
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if(headerPlaceholder) headerPlaceholder.innerHTML = headerHTML;
    if(footerPlaceholder) footerPlaceholder.innerHTML = footerHTML;

    // --- EFEK SCROLL PADA HEADER ---
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) mainHeader.classList.add('scrolled');
            else mainHeader.classList.remove('scrolled');
        });
    }

    // --- KODE FIREBASE & FORM HANDLER (DISATUKAN DI SINI) ---
    const formResi = document.getElementById('form-resi');
    if (formResi) {
        const firebaseConfig = { /* ... Masukkan firebaseConfig Anda di sini ... */ };
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        
        formResi.addEventListener('submit', function(e) {
            e.preventDefault();
            // ... (logika simpan data form resi) ...
            alert('Fungsi simpan resi aktif!');
        });
    }
});
