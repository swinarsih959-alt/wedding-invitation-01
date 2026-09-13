document.addEventListener('DOMContentLoaded', function() {
    // Ambil konfigurasi dari file config.js
    const indexBackgroundImages = window.weddingConfig.images.backgrounds;
    const indexCoupleNames = window.weddingConfig.couple.names; // Nama pasangan untuk halaman index



    // Isi nama pasangan di halaman awal
    const siteTitleCoupleNamesIndex = document.getElementById('siteTitleCoupleNamesIndex');
    if (siteTitleCoupleNamesIndex) {
        siteTitleCoupleNamesIndex.textContent = indexCoupleNames;
    }
    const coupleNamesIndex = document.getElementById('coupleNamesIndex');
    if (coupleNamesIndex) {
        coupleNamesIndex.textContent = indexCoupleNames;
    }

    // --- 1. Get Guest Name from URL ---
    const urlParams = new URLSearchParams(window.location.search);
    let guestName = urlParams.get('to');
    const guestNameElement = document.getElementById('guestName');

    if (guestName) {
        guestName = decodeURIComponent(guestName).replace(/\+/g, ' ');
        guestNameElement.textContent = guestName;
    } else {
        guestNameElement.textContent = 'Tamu Undangan';
    }
    
    // --- 2. Background Image Slideshow (index.html) ---
    const slides = document.querySelectorAll('.background-slider[data-background-index]');
    
    // Isi background-image dari konfigurasi
    if (window.weddingConfig.images.backgrounds && Array.isArray(window.weddingConfig.images.backgrounds) && window.weddingConfig.images.backgrounds.length > 0) {
        slides.forEach(slide => {
            const index = parseInt(slide.getAttribute('data-background-index'));
            if (window.weddingConfig.images.backgrounds[index]) {
                slide.style.backgroundImage = `url('${window.weddingConfig.images.backgrounds[index]}')`;
            }
        });

        let currentSlide = 0;

        function showNextSlide() {
            if (slides.length > 0) {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }
        }
        if (slides.length > 0) {
            setInterval(showNextSlide, 5000);
        }
    }
    
    // --- 3. Particle Animation ---
    const particlesContainer = document.querySelector('.particles-container');
    const numberOfParticles = 50;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 2 + 1;
        const startX = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}vw`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // --- 4. Handle the "Buka Undangan" button click ---
    const openButton = document.getElementById('openInvitationButton');
    openButton.addEventListener('click', function(event) {
        event.preventDefault();
        
        const currentGuestName = document.getElementById('guestName').textContent;
        const invitationURL = `invitation.html?to=${encodeURIComponent(currentGuestName)}`;
        
        window.location.href = invitationURL;
    });
});