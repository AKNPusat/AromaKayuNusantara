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
                    <!-- GANTI DENGAN LINK LOGO PNG TRANSPARAN ANDA -->
                    <img src="https://i.imgur.com/8Yv6ZcD.png" alt="Logo PT. Aroma Kayu Nusantara" class="logo">
                </a>
                <nav class="main-nav">
                    <!-- Menu "Tentang Kami" -->
                    <div class="nav-item">
                        <a href="#" class="nav-link">Tentang Kami</a>
                        <div class="dropdown-menu">
                            <a href="sekilas-akn.html">Sekilas AKN</a>
                            <a href="tonggak-sejarah.html">Tonggak Sejarah</a>
                            <a href="visi-misi.html">Visi, Misi, & Tata Nilai</a>
                            <a href="makna-logo.html">Makna Logo</a>
                            <a href="direksi.html">Direktur Utama</a>
                            <a href="komisaris.html">Komisaris Utama</a>
                        </div>
                    </div>
                    <!-- Menu "Bisnis Kami" -->
                    <div class="nav-item">
                        <a href="#" class="nav-link">Bisnis Kami</a>
                        <div class="dropdown-menu">
                            <a href="bisnis-akn1.html">AKN 1</a>
                            <a href="bisnis-akn2.html">AKN 2</a>
                            <a href="bisnis-akn3.html">AKN 3</a>
                        </div>
                    </div>
                    <!-- Menu "Media & Informasi" -->
                    <div class="nav-item">
                        <a href="#" class="nav-link">Media & Informasi</a>
                         <div class="dropdown-menu">
                            <a href="newsroom.html">AKN News Room</a>
                            <a href="publikasi.html">Publikasi</a>
                            <a href="kegiatan.html">Kegiatan</a>
                        </div>
                    </div>
                    <!-- Menu "Mitra AKN" -->
                    <div class="nav-item">
                        <a href="#" class="nav-link">Mitra AKN</a>
                         <div class="dropdown-menu">
                            <a href="firma.html">Firma AKN</a>
                            <a href="bmt.html">Bina Multi Transindo</a>
                        </div>
                    </div>
                    <!-- Menu "Keberlanjutan" -->
                    <div class="nav-item">
                         <a href="keberlanjutan.html" class="nav-link">Keberlanjutan</a>
                    </div>
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


    // --- 2. Efek Teks Berjalan ---
    const titleElement = document.getElementById('hero-title');
    if (titleElement) {
        const textToType = "Energi Gaharu untuk Dunia";
        let index = 0;
        titleElement.innerHTML = '';
        function type() {
            if (index < textToType.length) {
                titleElement.innerHTML += textToType.charAt(index);
                index++;
                setTimeout(type, 120);
            }
        }
        type();
    }
    

    // --- 3. Efek Header Transparan saat Scroll ---
    // Pastikan DOM sudah ter-render sebelum memilih .main-header
    setTimeout(() => {
        const mainHeader = document.querySelector('.main-header');
        if (mainHeader) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    mainHeader.classList.add('scrolled');
                } else {
                    mainHeader.classList.remove('scrolled');
                }
            });
        }
    }, 0);
    
});
