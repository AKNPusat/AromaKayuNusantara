// ==========================================================
// KODE header.js FINAL DENGAN LOGIKA HAMBURGER & DROPDOWN MOBILE
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
            // --- Clone mainNav untuk modifikasi tanpa merusak elemen asli
            const clonedMainNav = mainNav.cloneNode(true);
            clonedMainNav.querySelectorAll('li').forEach(li => {
                const submenu = li.querySelector('ul');
                if (submenu) {
                    li.classList.add('has-submenu');
                    const toggleBtn = document.createElement('span');
                    toggleBtn.classList.add('submenu-toggle');
                    toggleBtn.textContent = '▼';
                    li.insertBefore(toggleBtn, submenu);
                }
            });

            // --- Masukkan ke dalam mobile menu
            mobileMenuContainer.innerHTML = `
                <div class="mobile-menu-header">
                    <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/main/logo%20AROMA%20kayu.png" class="logo">
                    <button class="close-button">×</button>
                </div>
                <div class="top-header-mobile">${topHeader.innerHTML}</div>
                <nav class="main-nav-mobile">${clonedMainNav.innerHTML}</nav>
                <div class="top-links-mobile">${topLinks.innerHTML}</div>
            `;

            // Tombol close menu mobile
            const newCloseBtn = mobileMenuContainer.querySelector('.close-button');
            if (newCloseBtn) {
                newCloseBtn.addEventListener('click', () => {
                    mobileMenuContainer.classList.remove('active');
                });
            }

            // Tombol hamburger buka menu
            hamburger.addEventListener('click', () => {
                mobileMenuContainer.classList.add('active');
            });

            // --- Interaksi Dropdown Mobile: buka/tutup submenu
            mobileMenuContainer.querySelectorAll('.submenu-toggle').forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const parent = toggle.parentElement;
                    parent.classList.toggle('open');
                });
            });
        }
    }
}, 500); // beri waktu agar header termuat penuh
