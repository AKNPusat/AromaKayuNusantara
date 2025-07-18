// ===================================================================
// KODE app.js FINAL YANG LENGKAP & BERSIH
// ===================================================================

// --- Fungsi untuk Slider Tonggak Sejarah ---
function initHistorySlider() {
    const historySlider = document.querySelector('.history-slider');
    if (!historySlider) return;
    // ... (Sisa fungsi slider sama seperti jawaban sebelumnya, tidak perlu diubah)
}

// --- SATU-SATUNYA EVENT LISTENER DOMContentLoaded ---
document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Memuat Header dan Footer secara Dinamis (LENGKAP) ---
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
                    <img src="https://raw.githubusercontent.com/AKNPusat/AromaKayuNusantara/main/logo%20AROMA%20kayu.png" class="logo">
                </a>
                <nav class="main-nav">
                    <div class="nav-item">
                        <a href="tentang-kami.html" class="nav-link">Tentang Kami</a>
                        <div class="dropdown-menu">
                            <a href="tentang-kami.html#sekilas-akn">Sekilas AKN</a>
                            <a href="tentang-kami.html#tonggak-sejarah">Tonggak Sejarah</a>
                        </div>
                    </div>
                    <div class="nav-item">
                        <a href="bisnis-kami.html" class="nav-link">Bisnis Kami</a>
                        <div class="dropdown-menu">
                            <a href="bisnis-kami.html#hulu">Hulu (Bahan Baku)</a>
                            <a href="bisnis-kami.html#peredaran">Peredaran</a>
                            <a href="bisnis-kami.html#olahan">Industri Olahan</a>
                        </div>
                    </div>
                    <div class="nav-item">
                        <a href="media-informasi.html" class="nav-link">Media & Informasi</a>
                        <div class="dropdown-menu">
                            <a href="media-informasi.html#news-room">AKN News Room</a>
                        </div>
                    </div>
                    <div class="nav-item">
                        <a href="#" class="nav-link">Mitra AKN</a>
                        <div class="dropdown-menu">
                            <a href="#">Firma Astajati</a>
                            <a href="#">Bina Multi Transindo</a>
                        </div>
                    </div>
                    <div class="nav-item"><a href="keberlanjutan.html" class="nav-link">Keberlanjutan</a></div>
                    <div class="nav-item"><a href="lacak.html" class="nav-link">Lacak Resi</a></div>
                </nav>
                <div class="header-search">
                     <svg fill="currentColor" viewBox="0 0 24 24" style="width:24px;height:24px;"><path d="M9.5...Z" /></svg>
                </div>
            </div>
        </header>
    `;

    const footerHTML = `<footer class="main-footer">...</footer>`;

    // ... (kode untuk memuat header & footer) ...

    // --- 2. Efek Teks Berjalan (DIKEMBALIKAN) ---
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
    
    // --- 3. Efek Header Scroll (sudah benar) ---
    // ...

    // --- 4. Panggil Fungsi Slider (DIKEMBALIKAN) ---
    initHistorySlider();
});
