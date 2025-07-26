// ==========================================================
// KODE header.js FINAL DENGAN LOGIKA HAMBURGER YANG STABIL
// ==========================================================

setTimeout(function () {
    const hamburger = document.querySelector('.hamburger-button');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');

    if (hamburger && mobileMenuContainer) {
        // Periksa apakah konten utama ada
        const mainNav = document.querySelector('.main-nav');
        const topLinks = document.querySelector('.top-links-right');

        if (mainNav && topLinks) {
            // Masukkan isi ke dalam mobile menu
            mobileMenuContainer.innerHTML = `
                <div class="mobile-menu-header">
                    <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/main/logo%20AROMA%20kayu.png" class="logo">
                    <button class="close-button">×</button>
                </div>
                <nav class="main-nav-mobile">${mainNav.innerHTML}</nav>
                <div class="top-links-mobile">${topLinks.innerHTML}</div>
            `;

            // Tambahkan event listener ke tombol baru (yang sudah muncul)
            const newCloseBtn = mobileMenuContainer.querySelector('.close-button');
            if (newCloseBtn) {
                newCloseBtn.addEventListener('click', () => {
                    mobileMenuContainer.classList.remove('active');
                });
            }

            // ✅ Aktifkan tombol hamburger setelah isi dimasukkan
            hamburger.addEventListener('click', () => {
                mobileMenuContainer.classList.add('active');
            });
        }
    }
}, 500); // beri waktu 500ms agar header sudah termuat penuh
