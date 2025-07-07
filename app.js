document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Memuat Header dan Footer secara Dinamis ---
    const headerHTML = `
        <div class="top-header">
            <div class="header-container">
                <div class="top-links-right">
                    <a href="input_resi.html">Input Resi</a>
                    <a href="surat_jalan.html">Surat Jalan</a>
                    <a href="stok.html">Stok & Manajemen</a>
                </div>
            </div>
        </div>
        <header class="main-header">
            <div class="header-container">
                <a href="index.html" class="logo-link">
                    <img src="https://i.imgur.com/8Yv6ZcD.png" alt="Logo PT. Aroma Kayu Nusantara" class="logo">
                </a>
                <nav class="main-nav">
                    <div class="nav-item"><a href="tentang.html" class="nav-link">Tentang Kami</a></div>
                    <div class="nav-item"><a href="bisnis.html" class="nav-link">Bisnis Kami</a></div>
                    <div class="nav-item"><a href="media.html" class="nav-link">Media & Informasi</a></div>
                    <div class="nav-item"><a href="mitra.html" class="nav-link">Mitra AKN</a></div>
                    <div class="nav-item"><a href="keberlanjutan.html" class="nav-link">Keberlanjutan</a></div>
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

    // Cek apakah placeholder ada, lalu masukkan HTML
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
    }
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }


    // --- 2. Efek Teks Berjalan (Hanya jika ada di halaman) ---
    const titleElement = document.getElementById('hero-title');
    if (titleElement) {
        const textToType = "Energi Gaharu untuk Dunia";
        let index = 0;
        titleElement.innerHTML = ''; // Kosongkan dulu

        function type() {
            if (index < textToType.length) {
                titleElement.innerHTML += textToType.charAt(index);
                index++;
                setTimeout(type, 120); // Kecepatan mengetik
            }
        }
        type(); // Mulai mengetik
    }
    
});
// --- 3. Efek Header Transparan saat Scroll ---
const mainHeader = document.querySelector('.main-header');
if (mainHeader) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) { // Jika scroll lebih dari 50px
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });
}
