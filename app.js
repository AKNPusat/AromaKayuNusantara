// Kode ini HANYA untuk app.js
document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Memuat Header dan Footer secara Dinamis ---
    const headerHTML = `
        <div class="top-header">
            <div class="header-container">
                <div class="top-links-right">
                    <a href="input_resi.html">Input Resi</a>
                    <a href="surat_jalan.html">Surat Jalan</a>
                    <a href="stok.html">Stok</a>
                    <div class="nav-item">
                        <a href="#" class="nav-link-top">Manajemen</a>
                        <div class="dropdown-menu-top">
                            <a href="laporan_keuangan.html">Laporan Keuangan</a>
                            <a href="invoice.html">Invoice</a>
                        </div>
                    </div>
                    <a href="register.html" class="register-button">Registrasi Member</a>
                </div>
            </div>
        </div>
        <header class="main-header">
            <div class="header-container">
                <a href="index.html" class="logo-link">
                    <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/main/logo%20AROMA%20kayu.png" class="logo">
                </a>
                <nav class="main-nav">
                    <div class="nav-item">
                        <a href="tentang-kami.html" class="nav-link">Tentang Kami</a>
                    </div>
                    <!-- Menu Bisnis Kami (BENAR) -->
                    <div class="nav-item">
                        <a href="bisnis-kami.html" class="nav-link">Bisnis Kami</a>
                        <div class="dropdown-menu">
                            <a href="bisnis-kami.html#hulu">Hulu (Bahan Baku)</a>
                            <a href="bisnis-kami.html#peredaran">Peredaran</a>
                            <a href="bisnis-kami.html#olahan">Industri Olahan</a>
                        </div>
                    </div>
                    <!-- Menu Media & Informasi (BENAR) -->
                    <div class="nav-item">
                        <a href="media-informasi.html" class="nav-link">Media & Informasi</a>
                        <div class="dropdown-menu">
                            <a href="media-informasi.html#news-room">AKN News Room</a>
                            <a href="ruang-media.html">Ruang Media</a>
                            <a href="kegiatan.html">Kegiatan AKN</a>
                        </div>
                    </div>
                    <div class="nav-item"><a href="#" class="nav-link">Mitra AKN</a></div>
                    <div class="nav-item"><a href="lacak.html" class="nav-link">Lacak Resi</a></div>
                </nav>
                <div class="header-search">
                     <svg fill="currentColor" viewBox="0 0 24 24" style="width:24px;height:24px;"><path d="M9.5...Z" /></svg>
                </div>
            </div>
        </header>
    `;
    const footerHTML = `<footer class="main-footer"><p>© 2024 PT. Aroma Kayu Nusantara. All Rights Reserved.</p></footer>`;

    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) { headerPlaceholder.innerHTML = headerHTML; }
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) { footerPlaceholder.innerHTML = footerHTML; }

    // Efek Header Scroll
    setTimeout(() => {
        const topHeaderElem = document.querySelector('.top-header');
        const mainHeaderElem = document.querySelector('.main-header');
        if (mainHeaderElem && topHeaderElem) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    topHeaderElem.classList.add('scrolled');
                    mainHeaderElem.classList.add('scrolled');
                } else {
                    topHeaderElem.classList.remove('scrolled');
                    mainHeaderElem.classList.remove('scrolled');
                }
            });
        }
    }, 100);
});
