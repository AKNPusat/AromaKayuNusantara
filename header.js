// ==========================================================
// KODE LENGKAP & FINAL UNTUK HEADER.JS
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

    // --- Logika untuk Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger-button');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');

    if (hamburger && mobileMenuContainer) {
        // Ambil konten dari menu desktop untuk disalin ke mobile
        const mainNavContent = document.querySelector('.main-nav');
        const topLinksContent = document.querySelector('.top-links-right');

        // Pastikan konten ada sebelum menyalin
        if (mainNavContent && topLinksContent) {
            // Isi wadah mobile dengan konten menu
            mobileMenuContainer.innerHTML = `
                <div class="mobile-menu-header">
                    <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/main/logo%20AROMA%20kayu.png" class="logo">
                    <button class="close-button">×</button>
                </div>
                <nav class="main-nav-mobile">${mainNavContent.innerHTML}</nav>
                <div class="top-links-mobile">${topLinksContent.innerHTML}</div>
            `;

            // Fungsikan tombol hamburger dan close
            const closeBtn = mobileMenuContainer.querySelector('.close-button');
            
            hamburger.addEventListener('click', () => {
                mobileMenuContainer.classList.add('active');
            });

            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    mobileMenuContainer.classList.remove('active');
                });
            }
        }
    }
});
