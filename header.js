// ==========================================================
// KODE KHUSUS UNTUK HEADER
// ==========================================================
document.addEventListener("DOMContentLoaded", function() {
    // Efek Scroll
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

    // Logika Hamburger
    const hamburger = document.querySelector('.hamburger-button');
    const mobileMenu = document.querySelector('.mobile-menu-container');
    if (hamburger && mobileMenu) {
        // ... (logika hamburger)
    }
});
