// --- Fungsi untuk Slider Tonggak Sejarah ---
// Fungsi ini didefinisikan di luar agar bisa dipanggil nanti
function initHistorySlider() {
    const historySlider = document.querySelector('.history-slider');
    if (!historySlider) return;

    const navItems = historySlider.querySelectorAll('.history-nav-item');
    const slides = historySlider.querySelectorAll('.history-slide');
    if (navItems.length === 0 || slides.length === 0) return; // Tambahan pengaman

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

    function startSlideShow() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 7000);
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

// --- SATU-SATUNYA EVENT LISTENER DOMContentLoaded ---
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
                            <a href="tentang-kami.html#direksi">Manajemen</a>
                        </div>
                    </div>
                    <div class="nav-item">
    <a href="bisnis-kami.html" class="nav-link">Bisnis Kami</a>
    <div class="dropdown-menu">
        <!-- LINK SUDAH DIPERBAIKI -->
        <a href="bisnis-kami.html#hulu">Hulu (Bahan Baku)</a>
        <a href="bisnis-kami.html#peredaran">Peredaran</a>
        <a href="bisnis-kami.html#olahan">Industri Olahan</a>
    </div>
</div>
                    <div class="nav-item">
                        <a href="#" class="nav-link">Media & Informasi</a>
                        <div class="dropdown-menu"><a href="kegiatan.html">Kegiatan</a></div>
                    </div>
                    <div class="nav-item">
                        <a href="#" class="nav-link">Mitra AKN</a>
                        <div class="dropdown-menu">
                        <a href="firma.html">Firma Astajati Kian Nusantara</a>
                        <a href="firma.html">Bina Multi Tansindo</a>
                        </div>
                    </div>
                    <div class="nav-item"><a href="keberlanjutan.html" class="nav-link">Keberlanjutan</a></div>
                    <div class="nav-item"><a href="lacak.html" class="nav-link">Lacak Resi</a></div>
                </nav>
                <div class="header-search">
                     <svg fill="currentColor" viewBox="0 0 24 24" style="width:24px;height:24px;"><path d="M9.5,3A6.5...Z" /></svg>
                </div>
            </div>
        </header>
    `;

    const footerHTML = `<footer class="main-footer"><p>© 2024 PT. Aroma Kayu Nusantara</p></footer>`;

    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) { headerPlaceholder.innerHTML = headerHTML; }
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) { footerPlaceholder.innerHTML = footerHTML; }

    // --- 2. Efek Teks Berjalan ---
    const titleElement = document.getElementById('hero-title');
    if (titleElement) {
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
    
    // --- 3. Efek Header Transparan saat Scroll ---
    setTimeout(() => {    
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
    }, 100); // Beri jeda sedikit untuk memastikan header sudah dimuat
    
    // --- 4. Panggil Fungsi Slider setelah semua dimuat ---
    initHistorySlider();
});
