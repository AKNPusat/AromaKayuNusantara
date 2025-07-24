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
    
    // --- 3. LOGIKA SLIDER TONGGAK SEJARAH (VERSI BARU) ---
    const historySlider = document.querySelector('.history-slider');
    if (historySlider) {
        const navItems = historySlider.querySelectorAll('.history-nav-item');
        const slides = historySlider.querySelectorAll('.history-slide');
        let currentSlide = 0;
        let slideInterval;
        const DURATION = 7000; // Durasi per slide dalam milidetik (7 detik)

        function activateSlide(n) {
            // Hentikan animasi progress bar yang sedang berjalan
            navItems.forEach(item => {
                const progressBar = item.querySelector('.progress-bar');
                if (progressBar) {
                    progressBar.style.transition = 'none';
                    progressBar.style.width = '0%';
                }
                item.classList.remove('active');
            });
            slides.forEach(slide => slide.classList.remove('active'));

            currentSlide = (n + slides.length) % slides.length;

            navItems[currentSlide].classList.add('active');
            slides[currentSlide].classList.add('active');

            // Mulai animasi progress bar untuk slide yang aktif
            setTimeout(() => {
                const activeProgressBar = navItems[currentSlide].querySelector('.progress-bar');
                if (activeProgressBar) {
                    activeProgressBar.style.transition = `width ${DURATION / 1000}s linear`;
                    activeProgressBar.style.width = '100%';
                }
            }, 50); // Jeda kecil untuk memastikan transisi berjalan
        }

        function nextSlide() {
            activateSlide(currentSlide + 1);
        }

        function startSlideShow() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, DURATION);
            activateSlide(currentSlide); // Panggil sekali untuk memulai progress bar
        }

        navItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                activateSlide(index);
                // Reset autoplay
                clearInterval(slideInterval);
                startSlideShow();
            });
        });

        startSlideShow(); // Mulai semuanya
    }
});


    // --- KODE BARU: LOGIKA UNTUK MENU MOBILE ---
    setTimeout(() => {
        const mobileMenuContainer = document.querySelector('.mobile-menu-container');
        const mainNavContent = document.querySelector('.main-nav');
        const topLinksContent = document.querySelector('.top-links-right');
        
        if (mobileMenuContainer && mainNavContent && topLinksContent) {
            mobileMenuContainer.innerHTML = `
                <div class="mobile-menu-header">
                    <img src="https-link-logo-anda.png" class="logo">
                    <button class="close-button">×</button>
                </div>
                <nav class="main-nav-mobile">${mainNavContent.innerHTML}</nav>
                <div class="top-links-mobile">${topLinksContent.innerHTML}</div>
            `;

            const hamburger = document.querySelector('.hamburger-button');
            const closeBtn = mobileMenuContainer.querySelector('.close-button');
            if (hamburger && closeBtn) {
                hamburger.addEventListener('click', () => { mobileMenuContainer.classList.add('active'); });
                closeBtn.addEventListener('click', () => { mobileMenuContainer.classList.remove('active'); });
            }
        }
    }, 300);

}); // Penutup DOMContentLoaded
