// ===================================================================
// KODE app.js FINAL DENGAN LOGIKA HAMBURGER YANG BENAR
// ===================================================================

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
                   <div class="nav-item">
                       <a href="tentang-kami.html" class="nav-link">Tentang Kami</a>
                       <div class="dropdown-menu">...</div>
                   </div>
                   <!-- ... Semua menu dropdown Anda ... -->
                   <div class="nav-item"><a href="lacak.html" class="nav-link">Lacak Resi</a></div>
                </nav>
                <div class="header-search">
                     <svg fill="currentColor" viewBox="0 0 24 24" style="width:24px;height:24px;"><path d="M9.5...Z" /></svg>
                </div>
                <button class="hamburger-button">☰</button>
            </div>
        </header>
    `;
    const footerHTML = `<footer class="main-footer">...</footer>`;

    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) { headerPlaceholder.innerHTML = headerHTML; }
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) { footerPlaceholder.innerHTML = footerHTML; }

    // --- 2. Membuat dan Mengisi Menu Mobile ---
    // Buat wadah baru untuk menu mobile
    const mobileMenuContainer = document.createElement('div');
    mobileMenuContainer.className = 'mobile-menu'; // Kita akan style class ini nanti
    document.body.appendChild(mobileMenuContainer);

    // --- 3. Efek dan Fungsi setelah semua dimuat ---
    setTimeout(() => {
        // Efek Scroll (kode Anda sudah benar)
        const topHeader = document.querySelector('.top-header');
        const mainHeader = document.querySelector('.main-header');
        if (mainHeader && topHeader) {
            window.addEventListener('scroll', function() { /* ... kode scroll ... */ });
        }

        // Logika Tombol Hamburger (YANG DIPERBAIKI)
        const hamburger = document.querySelector('.hamburger-button');
        const mainNavContent = document.querySelector('.main-nav').innerHTML;
        const topLinksContent = document.querySelector('.top-links-right').innerHTML;
        
        if (hamburger) {
            mobileMenuContainer.innerHTML = `
                <div class="mobile-menu-header">
                    <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/main/logo%20AROMA%20kayu.png" class="logo">
                    <button class="close-button">×</button>
                </div>
                <nav class="main-nav-mobile">${mainNavContent}</nav>
                <div class="top-links-mobile">${topLinksContent}</div>
            `;
            
            const closeBtn = mobileMenuContainer.querySelector('.close-button');
            hamburger.addEventListener('click', () => { mobileMenuContainer.classList.add('active'); });
            closeBtn.addEventListener('click', () => { mobileMenuContainer.classList.remove('active'); });
        }
    }, 200); // Jeda untuk memastikan header sudah dimuat
    
    // Panggil fungsi slider jika ada
    if (typeof initHistorySlider === 'function') {
        initHistorySlider();
    }
});
