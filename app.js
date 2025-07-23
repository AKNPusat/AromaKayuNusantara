// ===================================================================
// KODE app.js LENGKAP DENGAN LOGIKA MOBILE MENU
// ===================================================================

// --- Fungsi untuk Slider Tonggak Sejarah ---
function initHistorySlider() {
    // ... (Fungsi slider Anda yang sudah ada, tidak diubah)
}

// --- FUNGSI UTAMA YANG BERJALAN SAAT HALAMAN DIMUAT ---
document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Memuat Header Desktop ---
    const headerHTML = `
        <div class="top-header">
            <div class="header-container">
                <div class="top-links-right">
                    <a href="input_resi.html">Input Resi</a>
                    <a href="surat_jalan.html">Surat Jalan</a>
                    <a href="stok.html">Stok</a>
                    <div class="nav-item">
                        <a href="#" class="nav-link-top">Manajemen</a>
                        <div class="dropdown-menu-top">...</div>
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
                   <!-- ... (Semua menu dropdown Anda yang sudah lengkap) ... -->
                </nav>
                <div class="header-search">...</div>
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
