document.addEventListener("DOMContentLoaded", function () {
    // --- 1. Memuat Header dan Footer secara Dinamis ---
    const headerHTML = `
        <div class="top-header">
            <div class="header-container">
                <div class="top-links-right">
                    <a href="input_resi.html">Input Resi</a>
                    <a href="surat_jalan.html">Surat Jalan</a>
                    <a href="stok.html">Stok</a>
                    <div class="nav-item has-dropdown">
                        <a href="#" class="nav-link-top dropdown-toggle" data-target="manajemen-dropdown">Manajemen</a>
                        <div class="dropdown-menu openable" id="manajemen-dropdown">
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
                    <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/main/logo%20AROMA%20kayu.png" class="logo">
                </a>
                <nav class="main-nav">
                    <div class="nav-item has-dropdown">
                        <a href="tentang-kami.html" class="nav-link dropdown-toggle" data-target="tentang-dropdown">Tentang Kami                             
                            <span class="arrow">▼</span> <!-- PANAH DITAMBAHKAN DI SINI -->
                            </a>
                        <div class="dropdown-menu openable" id="tentang-dropdown">
                            <a href="tentang-kami.html#sekilas-akn">Sekilas AKN</a>
                            <a href="tentang-kami.html#tonggak-sejarah">Tonggak Sejarah</a>
                            <a href="tentang-kami.html#visi-misi">Visi, Misi, & Tata Nilai</a>
                            <a href="tentang-kami.html#makna-logo">Makna Logo</a>
                            <a href="tentang-kami.html#manajemen">Manajemen</a>
                        </div>
                    </div>
                    <div class="nav-item has-dropdown">
                        <a href="bisnis-kami.html" class="nav-link dropdown-toggle" data-target="bisnis-dropdown">Bisnis Kami
                        <span class="arrow">▼</span> <!-- PANAH DITAMBAHKAN DI SINI -->
                            </a>
                        <div class="dropdown-menu openable" id="bisnis-dropdown">
                            <a href="bisnis-kami.html#hulu">Hulu (Bahan Baku)</a>
                            <a href="bisnis-kami.html#peredaran">Peredaran</a>
                            <a href="bisnis-kami.html#olahan">Industri Olahan</a>
                        </div>
                    </div>
                    <div class="nav-item has-dropdown">
                        <a href="media-informasi.html" class="nav-link dropdown-toggle" data-target="media-dropdown">Media & Informasi
                        <span class="arrow">▼</span> <!-- PANAH DITAMBAHKAN DI SINI -->
                            </a>
                        <div class="dropdown-menu openable" id="media-dropdown">
                            <a href="media-informasi.html#news-room">AKN News Room</a>
                            <a href="ruang-media.html">Ruang Media</a>
                            <a href="kegiatan.html">Kegiatan AKN</a>
                        </div>
                    </div>
                    <div class="nav-item has-dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-target="mitra-dropdown">Mitra AKN
                        <span class="arrow">▼</span> <!-- PANAH DITAMBAHKAN DI SINI -->
                            </a>
                        <div class="dropdown-menu openable" id="mitra-dropdown">
                            <a href="firma.html">Firma Astajati Kian Nusantara</a>
                            <a href="bmt.html">Bina Multi Transindo</a>
                        </div>
                    </div>
                    <div class="nav-item">
                        <a href="lacak.html" class="nav-link">Lacak Resi</a>
                    </div>
                </nav>
                <div class="header-search">
                    <svg fill="currentColor" viewBox="0 0 24 24" style="width:24px;height:24px;"><path d="M9.5...Z" /></svg>
                </div>
                <button class="hamburger-button">☰</button>
            </div>
        </header>
    `;

    const footerHTML = `...`; // Tetap seperti sebelumnya

    document.getElementById("header-placeholder").innerHTML = headerHTML;
    document.getElementById("footer-placeholder").innerHTML = footerHTML;

    const mobileMenuContainer = document.querySelector(".mobile-menu");

    setTimeout(() => {
        // Ambil ulang setelah header terisi
        const mainNavEl = document.querySelector(".main-nav");
        const topLinksEl = document.querySelector(".top-links-right");

        const mainNavContent = mainNavEl ? mainNavEl.innerHTML : "";
        const topLinksContent = topLinksEl ? topLinksEl.outerHTML : "";

        if (mobileMenuContainer) {
            mobileMenuContainer.innerHTML = `
                <div class="mobile-menu-header">
                    <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/main/logo%20AROMA%20kayu.png" class="logo">
                    <button class="close-button">×</button>
                </div>
                ${topLinksContent}
                <nav class="main-nav-mobile">${mainNavContent}</nav>
            `;
        }

        // Scroll efek
           setTimeout(() => {
        const topHeaderElem = document.querySelector('.top-header');
        const mainHeaderElem = document.querySelector('.main-header');
        if (mainHeaderElem && topHeaderElem) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    topHeaderElem.classList.add('scrolled');
                    mainHeaderElem.classList.add('scrolled');
                } else {
                    topHeaderElem.classList.remove('scrolled');
                    mainHeaderElem.classList.remove('scrolled');
                }
            });
        }
    }, 100);


        // Hamburger menu
        const hamburger = document.querySelector(".hamburger-button");
        const closeBtn = document.querySelector(".close-button");
        if (hamburger && closeBtn && mobileMenuContainer) {
            hamburger.addEventListener("click", () => {
                mobileMenuContainer.classList.add("active");
            });
            closeBtn.addEventListener("click", () => {
                mobileMenuContainer.classList.remove("active");
            });
        }

        // Dropdown Toggle Function
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('data-target');
                const targetMenu = document.getElementById(targetId);

                // Tutup semua menu lain
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    if (menu !== targetMenu) {
                        menu.classList.remove('open');
                    }
                });

                // Toggle menu target
                if (targetMenu) {
                    targetMenu.classList.toggle('open');
                }
            });
        });

        // Slider Riwayat
        if (typeof initHistorySlider === "function") {
            initHistorySlider();
        }

    }, 300);
});
/* ========================================================== */
/* KODE TAMBAHAN UNTUK DROPDOWN MOBILE */
/* ========================================================== */
@media (max-width: 1024px) {

    /* Style untuk menu yang memiliki submenu di mobile */
    .mobile-menu-container .nav-item.has-dropdown > .nav-link {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .mobile-menu-container .nav-link .arrow {
        font-size: 1rem; /* Ukuran panah */
        transition: transform 0.3s ease;
    }
    
    /* Saat menu terbuka, putar panahnya */
    .mobile-menu-container .nav-item.open > .nav-link .arrow {
        transform: rotate(180deg);
    }

    /* Sembunyikan submenu secara default */
    .mobile-menu-container .dropdown-menu {
        display: none;
        padding-left: 1.5rem; /* Beri indentasi agar terlihat seperti submenu */
        border-bottom: none;
        margin-top: 0.5rem;
    }

    /* Tampilkan submenu saat induknya (.nav-item) memiliki class 'open' */
    .mobile-menu-container .nav-item.open .dropdown-menu {
        display: block;
    }

    /* Style untuk link di dalam submenu */
    .mobile-menu-container .dropdown-menu a {
        font-size: 1.2rem;
        font-weight: 400; /* Dibuat lebih tipis dari menu utama */
        padding: 0.8rem 0;
        color: #d0d0d0; /* Warna sedikit redup */
        border-bottom: 1px solid rgba(255,255,255,0.05);
    }
}
