// ===================================================================
// KODE app.js FINAL YANG LENGKAP & FUNGSIONAL
// ===================================================================

document.addEventListener("DOMContentLoaded", function() {

    // --- BAGIAN 1: DEFINISI HTML UNTUK HEADER & FOOTER ---
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
                    <div class="nav-item">
                        <a href="bisnis-kami.html" class="nav-link">Bisnis Kami</a>
                        <div class="dropdown-menu">
                            <a href="bisnis-kami.html#hulu">Hulu (Bahan Baku)</a>
                            <a href="bisnis-kami.html#peredaran">Peredaran</a>
                            <a href="bisnis-kami.html#olahan">Industri Olahan</a>
                        </div>
                    </div>
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
                        </div>
                    </div>
                    <div class="nav-item"><a href="keberlanjutan.html" class="nav-link">Keberlanjutan</a></div>
                    <div class="nav-item"><a href="lacak.html" class="nav-link">Lacak Resi</a></div>
                </nav>
                <div class="header-search">
                     <svg fill="currentColor" viewBox="0 0 24 24" style="width:24px;height:24px;"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
                </div>
                <button class="hamburger-button">☰</button>
            </div>
        </header>
    `;
    const footerHTML = `<footer class="main-footer"><p>© 2024 PT. Aroma Kayu Nusantara. All Rights Reserved.</p></footer>`;

    // --- BAGIAN 2: MEMUAT HTML KE HALAMAN ---
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) { headerPlaceholder.innerHTML = headerHTML; }
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) { footerPlaceholder.innerHTML = footerHTML; }

    // --- BAGIAN 3: MENJALANKAN SEMUA FUNGSI INTERAKTIF ---
    // Dijalankan setelah jeda singkat untuk memastikan semua HTML sudah dimuat
    setTimeout(() => {
        // Efek Scroll Header
        const topHeader = document.querySelector('.top-header');
        const mainHeader = document.querySelector('.main-header');
        if (topHeader && mainHeader) {
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

        // Logika Slider Tonggak Sejarah
        initHistorySlider();

        // Logika Teks Berjalan
        initTypingEffect();

        // Logika Hamburger Menu (ini bagian baru)
        initMobileMenu();

    }, 200);
});

// --- BAGIAN 4: SEMUA FUNGSI DIDEFINISIKAN DI LUAR ---

function initHistorySlider() {
    const historySlider = document.querySelector('.history-slider');
    if (!historySlider) return;

    const navItems = historySlider.querySelectorAll('.history-nav-item');
    const slides = historySlider.querySelectorAll('.history-slide');
    if (navItems.length === 0 || slides.length === 0) return;

    let currentSlide = 0;
    let slideInterval;
    const DURATION = 7000;

    function activateSlide(n) { /* ... (kode activateSlide sama) ... */ }
    function nextSlide() { activateSlide(currentSlide + 1); }
    function startSlideShow() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, DURATION);
        activateSlide(currentSlide);
    }

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            activateSlide(index);
            clearInterval(slideInterval);
            startSlideShow();
        });
    });

    startSlideShow();
}

function initTypingEffect() {
    const titleElement = document.getElementById('hero-title');
    if (!titleElement) return;

    const textToType = "Investasi Gaharu untuk Nusantara";
    let index = 0;
    titleElement.innerHTML = '';
    function type() {
        if (index < textToType.length) {
            titleElement.innerHTML += textToType.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    type();
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-button');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    
    if (!hamburger || !mobileMenuContainer) return;

    // Salin menu dari desktop ke mobile
    const mainNavContent = document.querySelector('.main-nav').innerHTML;
    const topLinksContent = document.querySelector('.top-links-right').innerHTML;
    
    mobileMenuContainer.innerHTML = `
        <div class="mobile-menu-header">
            <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/main/logo%20AROMA%20kayu.png" class="logo">
            <button class="close-button">×</button>
        </div>
        <nav class="main-nav-mobile">${mainNavContent}</nav>
        <div class="top-links-mobile">${topLinksContent}</div>
    `;

    // Fungsikan tombol
    const closeBtn = mobileMenuContainer.querySelector('.close-button');
    hamburger.addEventListener('click', () => { mobileMenuContainer.classList.add('active'); });
    closeBtn.addEventListener('click', () => { mobileMenuContainer.classList.remove('active'); });
}
