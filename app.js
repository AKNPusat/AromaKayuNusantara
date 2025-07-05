// ===================================================================
// KODE app.js VERSI FINAL (Perbaikan #2)
// ===================================================================

document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Memuat Header dan Footer secara Dinamis ---
    const headerHTML = `
        <div class="top-header">
            <div class="header-container">
                <!-- Menu Internal di Kanan -->
                <div class="top-links-right">
                    <a href="input_resi.html">Input Resi</a>
                    <a href="surat_jalan.html">Surat Jalan</a>
                    <a href="stok.html">Stok</a>
                    
                    <!-- Dropdown Manajemen -->
                    <div class="nav-item-top">
                        <a href="#" class="nav-link-top">Manajemen</a>
                        <div class="dropdown-menu-top">
                            <a href="laporan_keuangan.html">Laporan Keuangan</a>
                            <a href="invoice.html">Invoice</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <header class="main-header">
            <div class="header-container">
                <a href="index.html" class="logo-link">
                    <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/main/logo%20AROMA%20kayu.png" alt="Logo PT. Aroma Kayu Nusantara" class="logo">
                </a>
                <nav class="main-nav">
                    <div class="nav-item">
                        <a href="#" class="nav-link">Tentang Kami</a>
                        <div class="dropdown-menu">
                            <a href="sekilas-akn.html">Sekilas AKN</a>
                            <a href="visi-misi.html">Visi & Misi</a>
                        </div>
                    </div>
                    <div class="nav-item"><a href="bisnis.html" class="nav-link">Bisnis Kami</a></div>
                    <div class="nav-item"><a href="media.html" class="nav-link">Media & Informasi</a></div>
                    <div class="nav-item"><a href="mitra.html" class="nav-link">Mitra AKN</a></div>
                    <div class="nav-item"><a href="keberlanjutan.html" class="nav-link">Keberlanjutan</a></div>
                    <div class="nav-item"><a href="lacak.html" class="nav-link">Lacak Kiriman</a></div>
                </nav>
                <div class="header-search">
                     <svg fill="currentColor" viewBox="0 0 24 24"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
                </div>
            </div>
        </header>
    `;
    const footerHTML = `
        <footer class="main-footer">
            <p>© 2024 PT. Aroma Kayu Nusantara. All Rights Reserved.</p>
        </footer>
    `;

    document.getElementById('header-placeholder').innerHTML = headerHTML;
    document.getElementById('footer-placeholder').innerHTML = footerHTML;

    // --- Efek Scroll Header ---
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
});
