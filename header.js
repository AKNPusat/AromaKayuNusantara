// ==========================================================
// KODE header.js FINAL DENGAN LOGIKA HAMBURGER YANG STABIL
// ==========================================================

setTimeout(function () {
    const hamburger = document.querySelector('.hamburger-button');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');

    if (hamburger && mobileMenuContainer) {
        // Ambil semua elemen yang dibutuhkan
        const topHeader = document.querySelector('.top-header');
        const mainNav = document.querySelector('.main-nav');
        const topLinks = document.querySelector('.top-links-right');

        if (topHeader && mainNav && topLinks) {
            // Masukkan isi ke dalam mobile menu
            mobileMenuContainer.innerHTML = `
                <div class="mobile-menu-header">
                    <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/main/logo%20AROMA%20kayu.png" class="logo">
                    <button class="close-button">×</button>
                </div>
                <div class="top-header-mobile">${topHeader.innerHTML}</div>
                <nav class="main-nav-mobile">${mainNav.innerHTML}</nav>
                <div class="top-links-mobile">${topLinks.innerHTML}</div>
            `;

            // Event tombol close
            const newCloseBtn = mobileMenuContainer.querySelector('.close-button');
            if (newCloseBtn) {
                newCloseBtn.addEventListener('click', () => {
                    mobileMenuContainer.classList.remove('active');
                });
            }

            // Event tombol hamburger
            hamburger.addEventListener('click', () => {
                mobileMenuContainer.classList.add('active');
            });
        }
    }
}, 500); // beri waktu agar header termuat penuh
