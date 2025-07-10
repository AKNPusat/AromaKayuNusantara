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
                    <div class="dropdown-menu-top">
                        <a href="laporan_keuangan.html">Laporan Keuangan</a>
                        <a href="invoice.html">Invoice</a>
                    </div>
                </div>
                <a href="register.html" class="register-button">Registrasi Member</a>
            </div>
        </div>
    </div>
        <header class="main-header">
            <div class="header-container">
                <a href="index.html" class="logo-link">
                    <!-- GANTI DENGAN LINK LOGO PNG TRANSPARAN ANDA -->
                    <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/f1aefa4404a1950a09bcee398914efd334d62c95/logo%20AROMA%20kayu.png" class="logo">
                </a>
                <nav class="main-nav">
                <div class="nav-item">
                    <a href="#" class="nav-link">Tentang Kami</a>
                    <div class="dropdown-menu">
                        <a href="tentang-kami.html#sekilas-akn">Sekilas AKN</a>
                        <a href="tentang-kami.html#tonggak-sejarah">Tonggak Sejarah</a>
                        <a href="tentang-kami.html#visi-misi">Visi, Misi, & Tata Nilai</a>
                        <a href="tentang-kami.html#makna-logo">Makna Logo</a>
                        <a href="tentang-kami.html#direksi">Manajemen</a>
                    </div>
                </div>
                <div class="nav-item">
                    <a href="#" class="nav-link">Bisnis Kami</a>
                    <div class="dropdown-menu">
                        <a href="#">Layanan AKN 1</a>
                        <a href="#">Layanan AKN 2</a>
                        <a href="#">Layanan AKN 3</a>
                    </div>
                </div>
                <div class="nav-item">
                    <a href="#" class="nav-link">Media & Informasi</a>
                    <div class="dropdown-menu">                        
                        <a href="newsroom.html">AKN News Room</a>
                        <a href="publikasi.html">Publikasi</a>
                        <a href="kegiatan.html">Kegiatan</a>
                    </div>
                </div>
                <div class="nav-item">
                    <a href="#" class="nav-link">Mitra AKN</a>
                    <div class="dropdown-menu">
                        <a href="#">Mitra A</a>
                        <a href="firma.html">Firma AKN</a>
                        <a href="bmt.html">Bina Multi Transindo</a>
                    </div>
                </div>
                 <div class="nav-item">
                    <a href="keberlanjutan.html" class="nav-link">Keberlanjutan</a>
                </div>
                <div class="nav-item">
                    <a href="lacak.html" class="nav-link">Lacak Resi</a>
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
        const textToType = "Investasi Gaharu untuk Nusantara";
        let index = 0;
        titleElement.innerHTML = '';
        function type() {
            if (index < textToType.length) {
                titleElement.innerHTML += textToType.charAt(index);
                index++;
                setTimeout(type, 100);
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
