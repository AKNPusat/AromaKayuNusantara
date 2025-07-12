// ===================================================================
// KODE app.js FINAL YANG SUDAH BERSIH & RAPI
// ===================================================================

// --- Fungsi untuk Slider Tonggak Sejarah ---
function initHistorySlider() {
    const historySlider = document.querySelector('.history-slider');
    if (!historySlider) return; // Jika tidak ada slider di halaman ini, hentikan

    const navItems = historySlider.querySelectorAll('.history-nav-item');
    const slides = historySlider.querySelectorAll('.history-slide');
    let currentSlide = 0;
    let slideInterval;

    function activateSlide(n) {
        // Pastikan n adalah angka yang valid
        if (n === undefined || n < 0 || n >= slides.length) {
            n = 0;
        }

        // Hapus kelas 'active' dari semua item
        navItems.forEach(item => item.classList.remove('active'));
        slides.forEach(slide => slide.classList.remove('active'));

        // Tambahkan kelas 'active' ke item yang benar
        navItems[n].classList.add('active');
        slides[n].classList.add('active');
        currentSlide = n;
    }

    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0; // Kembali ke slide pertama
        }
        activateSlide(next);
    }

    // Event listener untuk setiap tombol navigasi
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            activateSlide(index);
            // Reset autoplay saat pengguna klik manual
            clearInterval(slideInterval);
            startSlideShow();
        });
    });

    // Fungsi untuk memulai autoplay
    function startSlideShow() {
        // Hentikan dulu autoplay yang mungkin sudah berjalan
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 7000); // Ganti slide setiap 7 detik
    }

    // Mulai semuanya
    activateSlide(0); // Tampilkan slide pertama
    startSlideShow(); // Mulai autoplay
}


// --- INI ADALAH SATU-SATUNYA DOMContentLoaded LISTENER ---
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
                    <div class="nav-item">
                        <a href="#" class="nav-link">Bisnis Kami</a>
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
                     <svg fill="currentColor" viewBox="0 0 24 24" style="width:24px;height:24px;"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
                </div>
            </div>
        </header>
    `;

    const footerHTML = `
        <footer class="main-footer">
            <p>© 2024 PT. Aroma Kayu Nusantara. All Rights Reserved.</p>
        </footer>
    `;

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
        const mainHeader = document.querySelector('.main-header');
        if (mainHeader) {
          window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    mainHeader.classList.add('scrolled');
                } else {
                    mainHeader.classList.remove('scrolled');
                }
            });
        }
    }, 0);

    // --- 4. Panggil Fungsi Slider setelah semua dimuat ---
    initHistorySlider();
});
