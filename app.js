// ===================================================================
// KODE app.js PALING STABIL (SUDAH DIPERIKSA ULANG)
// ===================================================================

document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Definisi HTML untuk Header & Footer ---
    const headerHTML = `
        <div class="top-header">
            <div class="header-container">
                <div class="top-links-right">
                    <a href="input_resi.html">Input Resi</a>
                    <a href="surat_jalan.html">Surat Jalan</a>
                    <a href="stok.html">Stok</a>
                    <a href="#">Manajemen</a>
                    <a href="register.html" class="register-button">Registrasi Member</a>
                </div>
            </div>
        </div>
        <header class="main-header">
            <div class="header-container">
                <a href="index.html" class="logo-link">
                    <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/main/logo%20AROMA%20kayu.png" alt="Logo PT. Aroma Kayu Nusantara" class="logo">
                </a>
                <nav class="main-nav">
                    <a href="tentang-kami.html" class="nav-link">Tentang Kami</a>
                    <a href="bisnis-kami.html" class="nav-link">Bisnis Kami</a>
                    <a href="media-informasi.html" class="nav-link">Media & Informasi</a>
                    <a href="#" class="nav-link">Mitra AKN</a>
                    <a href="keberlanjutan.html" class="nav-link">Keberlanjutan</a>
                    <a href="lacak.html" class="nav-link">Lacak Resi</a>
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

    // --- 2. Memuat Header dan Footer ke Halaman ---
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
    }
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }

    // --- 3. Logika untuk Efek Header Scroll ---
    // Kita panggil setelah jeda singkat untuk memastikan header sudah dimuat
    setTimeout(() => {
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
    }, 100);

    // --- 4. Logika untuk Efek Teks Berjalan di Hero Section ---
    const titleElement = document.getElementById('hero-title');
    if (titleElement) {
        const textToType = "Investasi Gaharu untuk Nusantara";
        let index = 0;
        titleElement.innerHTML = '';
        function type() {
            if (index < textToType.length) {
                titleElement.innerHTML += textToType.charAt(index);
                index++;
                setTimeout(type, 120); // Kecepatan mengetik
            }
        }
        type();
    }
});
