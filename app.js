// ===================================================================
// KODE app.js FINAL (DROPDOWN + SLIDER)
// ===================================================================

// --- Fungsi untuk Slider Tonggak Sejarah ---
function initHistorySlider() {
    const historySlider = document.querySelector('.history-slider');
    if (!historySlider) return;

    const navItems = historySlider.querySelectorAll('.history-nav-item');
    const slides = historySlider.querySelectorAll('.history-slide');
    if (navItems.length === 0 || slides.length === 0) return;

    let currentSlide = 0;
    let slideInterval;

    function activateSlide(n) {
        navItems.forEach(item => item.classList.remove('active'));
        slides.forEach(slide => slide.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;

        navItems[currentSlide].classList.add('active');
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        activateSlide(currentSlide + 1);
    }

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            activateSlide(index);
            clearInterval(slideInterval);
            startSlideShow();
        });
    });

    function startSlideShow() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 7000);
    }

    activateSlide(0);
    startSlideShow();
}


// --- INI ADALAH SATU-SATUNYA DOMContentLoaded LISTENER ---
document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Memuat Header dan Footer (DENGAN STRUKTUR DROPDOWN) ---
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
                        </div>
                    </div>
                    <div class="nav-item">
                        <a href="#" class="nav-link">Bisnis Kami</a>
                         <div class="dropdown-menu">
                            <a href="#">Layanan 1</a>
                        </div>
                    </div>
                    <div class="nav-item">
                        <a href="#" class="nav-link">Media & Informasi</a>
                    </div>
                    <div class="nav-item">
                        <a href="#" class="nav-link">Mitra AKN</a>
                    </div>
                    <div class="nav-item">
                        <a href="keberlanjutan.html" class="nav-link">Keberlanjutan</a>
                    </div>
                    <div class="nav-item">
                        <a href="lacak.html" class="nav-link">Lacak Resi</a>
                    </div>
                </nav>
                <div class="header-search">
                     <svg fill="currentColor" viewBox="0 0 24 24" style="width:24px;height:24px;"><path d="M9.5,3A6.5...Z" /></svg>
                </div>
            </div>
        </header>
    `;
    const footerHTML = `...`; // Kode footer Anda

    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) { headerPlaceholder.innerHTML = headerHTML; }

    // Efek Teks Berjalan (tidak berubah)
    const titleElement = document.getElementById('hero-title');
    if (titleElement) { /* ... kode efek ketik sama ... */ }
    
    // Efek Header Scroll (tidak berubah)
    setTimeout(() => { /* ... kode efek scroll sama ... */ }, 0);

    // Panggil Fungsi Slider setelah semua dimuat
    initHistorySlider();
});
