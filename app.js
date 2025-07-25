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
    <div class="dropdown-menu">
        <a href="tentang-kami.html#sekilas-akn">Sekilas AKN</a>
        <a href="tentang-kami.html#tonggak-sejarah">Tonggak Sejarah</a>
        <a href="tentang-kami.html#visi-misi">Visi, Misi, & Tata Nilai</a>
        <a href="tentang-kami.html#makna-logo">Makna Logo</a>
        <a href="tentang-kami.html#manajemen">Manajemen</a>
    </div>
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
                    <div class="nav-item">
    <a href="#" class="nav-link">Mitra AKN</a>
    <div class="dropdown-menu">
        <a href="firma.html">Firma Astajati Kian Nusantara</a>
        <a href="bmt.html">Bina Multi Transindo</a>
        <!-- Tambahkan mitra lain di sini jika perlu -->
    </div>
</div>
                    <div class="nav-item"><a href="lacak.html" class="nav-link">Lacak Resi</a></div>
                </nav>
                <div class="header-search">
                     <svg fill="currentColor" viewBox="0 0 24 24" style="width:24px;height:24px;"><path d="M9.5...Z" /></svg>
                </div>
                <button class="hamburger-button">☰</button>
            </div>
        </header>
    `;
    const footerHTML = `...`;

    document.getElementById('header-placeholder').innerHTML = headerHTML;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;

    // --- 2. Membuat dan Mengisi Menu Mobile ---
    const mobileMenuContainer = document.querySelector('.mobile-menu');
    const mainNavContent = document.querySelector('.main-nav').innerHTML;
    const topLinksContent = document.querySelector('.top-links-right').innerHTML;
    
    if (mobileMenuContainer) {
        mobileMenuContainer.innerHTML = `
            <div class="mobile-menu-header">
                <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/main/logo%20AROMA%20kayu.png" class="logo">
                <button class="close-button">×</button>
            </div>
            <nav class="main-nav-mobile">${mainNavContent}</nav>
            <div class="top-links-mobile">${topLinksContent}</div>
        `;
    }

    // --- 3. Efek dan Fungsi setelah semua dimuat ---
    setTimeout(() => {
        // Efek Scroll
        const topHeader = document.querySelector('.top-header');
        const mainHeader = document.querySelector('.main-header');
        if (mainHeader && topHeader) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    topHeader.classList.add('scrolled');
                    mainHeader.classList.add('scrolled');
                } else {
                    topHeader.classList.remove('scrolled');
                    mainHeader.classList.remove('scrolled');
                }
            });
        }

        // Logika Tombol Hamburger
        const hamburger = document.querySelector('.hamburger-button');
        const closeBtn = document.querySelector('.close-button');
        if (hamburger && mobileMenuContainer && closeBtn) {
            hamburger.addEventListener('click', () => { mobileMenuContainer.classList.add('active'); });
            closeBtn.addEventListener('click', () => { mobileMenuContainer.classList.remove('active'); });
        }
        
    }, 200); // Jeda untuk memastikan header sudah dimuat
    
    // Panggil fungsi slider
    initHistorySlider();
});
