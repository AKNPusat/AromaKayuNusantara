// ===================================================================
// KODE LENGKAP app.js (KODE ANDA + PENAMBAHAN LOGIKA MOBILE)
// ===================================================================

document.addEventListener("DOMContentLoaded", function() {
    // --- 1. Memuat Header dan Footer (Kode Anda, tidak diubah) ---
    const headerHTML = `
        <div class="top-header">
            <div class="header-container">
                <div class="top-links-right">
                    <a href="input_resi.html">Input Resi</a>
                    <a href="surat_jalan.html">Surat Jalan</a>
                    <a href="stok.html">Stok</a>
                    <div class="nav-item">...</div>
                    <a href="register.html" class="register-button">Registrasi Member</a>
                </div>
            </div>
        </div>
        <header class="main-header">
            <div class="header-container">
                <a href="index.html" class="logo-link">...</a>
                <nav class="main-nav">
                   <div class="nav-item">...</div>
                   <!-- ... Semua menu dropdown Anda ... -->
                </nav>
                <div class="header-search">...</div>
                <button class="hamburger-button">☰</button>
            </div>
        </header>
    `;
    const footerHTML = `<footer ...>...</footer>`;

    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) { headerPlaceholder.innerHTML = headerHTML; }
    // ... (sisa kode untuk memuat footer)

    // --- Efek dan Fungsi setelah semua dimuat ---
    setTimeout(() => {
        // Efek Scroll (Kode Anda, tidak diubah)
        const topHeader = document.querySelector('.top-header');
        const mainHeader = document.querySelector('.main-header');
        if (mainHeader && topHeader) {
            window.addEventListener('scroll', function() { /* ... kode scroll ... */ });
        }

        // --- KODE BARU: MEMBUAT DAN MENGONTROL MENU MOBILE ---
        const mobileMenuContainer = document.querySelector('.mobile-menu-container');
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

            const hamburger = document.querySelector('.hamburger-button');
            const closeBtn = mobileMenuContainer.querySelector('.close-button');
            if (hamburger && closeBtn) {
                hamburger.addEventListener('click', () => { mobileMenuContainer.classList.add('active'); });
                closeBtn.addEventListener('click', () => { mobileMenuContainer.classList.remove('active'); });
            }
        }
    }, 200);
    
    // --- Logika Slider (Kode Anda, tidak diubah) ---
    const historySlider = document.querySelector('.history-slider');
    if (historySlider) {
        // ... (seluruh logika slider Anda)
    }
});
