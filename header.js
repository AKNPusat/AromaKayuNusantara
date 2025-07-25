// ==========================================================
// KODE header.js FINAL DENGAN LOGIKA HAMBURGER YANG STABIL
// ==========================================================

document.addEventListener("DOMContentLoaded", function() {

    // --- Efek Header Scroll ---
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

    // --- Logika untuk Hamburger Menu (dijalankan setelah jeda) ---
    setTimeout(function() {
        const hamburger = document.querySelector('.hamburger-button');
        const mobileMenuContainer = document.querySelector('.mobile-menu-container');
        
        if (hamburger && mobileMenuContainer) {
            const closeBtn = mobileMenuContainer.querySelector('.close-button');
            
            // Periksa apakah konten sudah ada sebelum menyalin
            const mainNav = document.querySelector('.main-nav');
            const topLinks = document.querySelector('.top-links-right');

            if (mainNav && topLinks) {
                // Isi menu mobile dengan konten dari header desktop
                mobileMenuContainer.innerHTML = `
                    <div class="mobile-menu-header">
                        <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/main/logo%20AROMA%20kayu.png" class="logo">
                        <button class="close-button">×</button>
                    </div>
                    <nav class="main-nav-mobile">${mainNav.innerHTML}</nav>
                    <div class="top-links-mobile">${topLinks.innerHTML}</div>
                `;

                // Fungsikan tombol close setelah dibuat
                const newCloseBtn = mobileMenuContainer.querySelector('.close-button');
                if (newCloseBtn) {
                    newCloseBtn.addEventListener('click', () => {
                        mobileMenuContainer.classList.remove('active');
                    });
                }
            }

            // Fungsikan tombol hamburger
            hamburger.addEventListener('click', () => {
                mobileMenuContainer.classList.add('active');
            });
        }
    }, 300); // Beri jeda 300 milidetik

});
