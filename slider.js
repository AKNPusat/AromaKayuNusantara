// ==========================================================
// KODE KHUSUS UNTUK SLIDER TONGGAK SEJARAH
// ==========================================================
document.addEventListener("DOMContentLoaded", function() {
    
    const historySlider = document.querySelector('.history-slider');
    // Jika tidak ada elemen slider di halaman ini, hentikan script
    if (!historySlider) {
        return;
    }

    const navItems = historySlider.querySelectorAll('.history-nav-item');
    const slides = historySlider.querySelectorAll('.history-slide');
    
    // Periksa lagi apakah elemen navigasi dan slide ditemukan
    if (navItems.length === 0 || slides.length === 0) {
        console.error("Elemen slider atau navigasi tidak ditemukan.");
        return;
    }

    let currentSlide = 0;
    let slideInterval;
    const DURATION = 7000; // Durasi slide 7 detik

    function activateSlide(n) {
        // Hapus class 'active' dari semua
        navItems.forEach(item => item.classList.remove('active'));
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Atur slide saat ini
        currentSlide = (n + slides.length) % slides.length;
        
        // Tambahkan class 'active' ke yang baru
        navItems[currentSlide].classList.add('active');
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        activateSlide(currentSlide + 1);
    }

    function startSlideShow() {
        clearInterval(slideInterval); // Hentikan yang lama
        slideInterval = setInterval(nextSlide, DURATION);
    }

    // Event listener untuk tombol navigasi
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            activateSlide(index);
            // Reset autoplay saat pengguna klik manual
            clearInterval(slideInterval);
            startSlideShow();
        });
    });

    // Mulai semuanya
    activateSlide(0); // Tampilkan slide pertama
    startSlideShow(); // Mulai autoplay
});
