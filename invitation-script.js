document.addEventListener('DOMContentLoaded', function() {
    // Gunakan konfigurasi dari file config.js
    const weddingConfig = window.weddingConfig;



    // --- Fungsi untuk Mengisi Data dari Konfigurasi ke HTML ---
    function fillContentFromConfig() {
        // Bagian Header/Intro
        if (document.getElementById('siteTitleCoupleNames')) document.getElementById('siteTitleCoupleNames').textContent = weddingConfig.couple.names;
        if (document.getElementById('introCoupleAlt')) document.getElementById('introCoupleAlt').textContent = weddingConfig.couple.names;
        if (document.getElementById('introCoupleNames')) document.getElementById('introCoupleNames').textContent = weddingConfig.couple.names;
        if (document.getElementById('introEventDate')) document.getElementById('introEventDate').textContent = weddingConfig.event.introDate;
        if (document.getElementById('coupleIntroPhoto')) document.getElementById('coupleIntroPhoto').src = weddingConfig.images.coupleIntro;

        // Bagian Opening Verse (Pasangan & Orang Tua)
        if (document.getElementById('brideNameAlt')) document.getElementById('brideNameAlt').textContent = weddingConfig.couple.bride.fullName;
        if (document.getElementById('brideName')) document.getElementById('brideName').textContent = weddingConfig.couple.bride.fullName;
        if (document.getElementById('brideFather')) document.getElementById('brideFather').textContent = weddingConfig.couple.bride.father;
        if (document.getElementById('brideMother')) document.getElementById('brideMother').textContent = weddingConfig.couple.bride.mother;
        if (document.getElementById('brideProfilePhoto')) document.getElementById('brideProfilePhoto').src = weddingConfig.images.brideProfile;

        if (document.getElementById('groomNameAlt')) document.getElementById('groomNameAlt').textContent = weddingConfig.couple.groom.fullName;
        if (document.getElementById('groomName')) document.getElementById('groomName').textContent = weddingConfig.couple.groom.fullName;
        if (document.getElementById('groomFather')) document.getElementById('groomFather').textContent = weddingConfig.couple.groom.father;
        if (document.getElementById('groomMother')) document.getElementById('groomMother').textContent = weddingConfig.couple.groom.mother;
        if (document.getElementById('groomProfilePhoto')) document.getElementById('groomProfilePhoto').src = weddingConfig.images.groomProfile;

        // Bagian Save The Date - Akad
        if (document.getElementById('akadDate')) document.getElementById('akadDate').textContent = weddingConfig.event.akad.date;
        if (document.getElementById('akadTime')) document.getElementById('akadTime').textContent = weddingConfig.event.akad.time;
        if (document.getElementById('akadLocation')) document.getElementById('akadLocation').textContent = weddingConfig.event.akad.location;
        if (document.getElementById('akadCalendarButton')) document.getElementById('akadCalendarButton').href = weddingConfig.event.akad.googleCalendarLink;

        // Bagian Resepsi
        if (document.getElementById('resepsiDateTime')) document.getElementById('resepsiDateTime').textContent = weddingConfig.event.resepsi.dateTime;
        if (document.getElementById('resepsiLocationName')) document.getElementById('resepsiLocationName').textContent = weddingConfig.event.resepsi.locationName;
        if (document.getElementById('resepsiAddress')) document.getElementById('resepsiAddress').textContent = weddingConfig.event.resepsi.address;
        if (document.getElementById('resepsiMapButton')) document.getElementById('resepsiMapButton').href = weddingConfig.event.resepsi.googleMapsLink;

        // Bagian Ngunduh Mantu (Opsional - hanya muncul jika ada dan tidak kosong di konfigurasi)
        const ngunduhMantuSection = document.getElementById('ngunduh-mantu');
        if (ngunduhMantuSection && weddingConfig.event.ngunduhMantu && 
            weddingConfig.event.ngunduhMantu.dateTime && 
            weddingConfig.event.ngunduhMantu.locationName && 
            weddingConfig.event.ngunduhMantu.address) {
            if (document.getElementById('ngunduhMantuDateTime')) document.getElementById('ngunduhMantuDateTime').textContent = weddingConfig.event.ngunduhMantu.dateTime;
            if (document.getElementById('ngunduhMantuLocationName')) document.getElementById('ngunduhMantuLocationName').textContent = weddingConfig.event.ngunduhMantu.locationName;
            if (document.getElementById('ngunduhMantuAddress')) document.getElementById('ngunduhMantuAddress').textContent = weddingConfig.event.ngunduhMantu.address;
            if (document.getElementById('ngunduhMantuMapButton')) document.getElementById('ngunduhMantuMapButton').href = weddingConfig.event.ngunduhMantu.googleMapsLink;
        } else if (ngunduhMantuSection) {
            // Sembunyikan section ngunduh mantu jika tidak ada di konfigurasi atau isinya kosong
            ngunduhMantuSection.style.display = 'none';
        }
        

        // Bagian Gallery: GENERATE DINAMIS
        const gallerySliderContainer = document.getElementById('gallerySlider');
        if (gallerySliderContainer && weddingConfig.images.gallery && Array.isArray(weddingConfig.images.gallery) && weddingConfig.images.gallery.length > 0) {
            gallerySliderContainer.innerHTML = ''; // Hapus elemen galeri yang sudah ada
            weddingConfig.images.gallery.forEach((imagePath, index) => {
                const slideDiv = document.createElement('div');
                slideDiv.classList.add('gallery-slide');
                if (index === 0) {
                    slideDiv.classList.add('active'); // Foto pertama aktif
                }
                const img = document.createElement('img');
                img.src = imagePath;
                img.alt = `Galeri ${index + 1}`;
                slideDiv.appendChild(img);
                gallerySliderContainer.appendChild(slideDiv);
            });
        } else {
            // Jika tidak ada gambar galeri, sembunyikan section ini
            const gallerySection = document.getElementById('gallery');
            if (gallerySection) {
                gallerySection.style.display = 'none';
            }
        }
        
        // Video Story
        const videoStoryFrame = document.getElementById('videoStoryFrame');
        const videoStorySection = document.getElementById('video-story-section');
        if (videoStoryFrame && videoStorySection && weddingConfig.images.videoStoryUrl && weddingConfig.images.videoStoryUrl.trim() !== "") {
            videoStoryFrame.src = weddingConfig.images.videoStoryUrl;
        } else if (videoStorySection) {
            // Sembunyikan section video story jika tidak ada video atau URL kosong
            videoStorySection.style.display = 'none';
        }

        // Bagian Hadiah (Bank Account) - Dinamis untuk satu atau lebih rekening
        const bankAccountsContainer = document.getElementById('bankAccountsContainer');
        if (bankAccountsContainer) {
            bankAccountsContainer.innerHTML = ''; // Hapus konten sebelumnya
            
            // Periksa apakah weddingConfig.bank adalah array atau objek tunggal
            let bankAccounts = [];
            if (Array.isArray(weddingConfig.bank)) {
                bankAccounts = weddingConfig.bank;
            } else {
                // Jika bukan array, ubah ke array dengan satu item
                bankAccounts = [weddingConfig.bank];
            }
            
            // Generate elemen untuk setiap rekening bank
            bankAccounts.forEach((bank, index) => {
                const bankAccountDiv = document.createElement('div');
                bankAccountDiv.className = 'bank-account';
                bankAccountDiv.innerHTML = `
                    <p><strong>${bank.name}</strong></p>
                    <p><strong>No. Rek:</strong> <span class="account-number">${bank.accountNumber}</span></p>
                    <p><strong>A.N:</strong> ${bank.accountName}</p>
                    <button class="copy-button" data-clipboard-text="${bank.accountNumber}" data-bank-index="${index}">Salin No. Rekening</button>
                `;
                bankAccountsContainer.appendChild(bankAccountDiv);
            });
            
            // Tambahkan event listener untuk semua tombol salin
            const copyButtons = document.querySelectorAll('#bankAccountsContainer .copy-button');
            copyButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const textToCopy = this.getAttribute('data-clipboard-text');
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        alert('Nomor rekening berhasil disalin!');
                    }).catch(err => {
                        console.error('Could not copy text: ', err);
                    });
                });
            });
        }

        // Bagian Closing
        if (document.getElementById('closingCoupleNames')) document.getElementById('closingCoupleNames').textContent = weddingConfig.couple.names;

        // Background Slideshow (invitation.html): GENERATE DINAMIS
        const backgroundSliderWrapper = document.querySelector('.background-slider-wrapper');
        if (backgroundSliderWrapper && weddingConfig.images.backgrounds && Array.isArray(weddingConfig.images.backgrounds) && weddingConfig.images.backgrounds.length > 0) {
            backgroundSliderWrapper.innerHTML = ''; // Hapus semua slide yang ada
            weddingConfig.images.backgrounds.forEach((imagePath, index) => {
                const slideDiv = document.createElement('div');
                slideDiv.classList.add('background-slider-invitation');
                if (index === 0) {
                    slideDiv.classList.add('active');
                }
                slideDiv.setAttribute('data-background-index', index);
                slideDiv.style.backgroundImage = `url('${imagePath}')`;
                backgroundSliderWrapper.appendChild(slideDiv);
            });
        }
    }

    // Panggil fungsi untuk mengisi konten saat DOM siap
    fillContentFromConfig();

    // --- 1. Play Music Automatically ---
    const audio = document.getElementById('wedding-music');
    audio.play().catch(error => {
        console.log('Autoplay prevented. User interaction is required to play music.', error);
    });

    // --- 2. Get Guest Name from URL ---
    const urlParams = new URLSearchParams(window.location.search);
    let guestName = urlParams.get('to');
    if (guestName) {
        guestName = decodeURIComponent(guestName).replace(/\+/g, ' ');
        // Guest name element is not in invitation.html, but if added it would be filled here
        const guestNameElement = document.getElementById('guestName');
        if (guestNameElement) {
            guestNameElement.textContent = guestName;
        }
    } else {
        // Default value jika tidak ada parameter 'to' di URL
        const guestNameElement = document.getElementById('guestName');
        if (guestNameElement) {
            guestNameElement.textContent = 'Tamu Undangan';
        }
    }

    // --- 3. Countdown Timer ---
    const countdownDate = weddingConfig.event.countdownDate;
    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysElement = document.getElementById("days");
        if (daysElement) daysElement.textContent = days < 10 ? '0' + days : days;
        const hoursElement = document.getElementById("hours");
        if (hoursElement) hoursElement.textContent = hours < 10 ? '0' + hours : hours;
        const minutesElement = document.getElementById("minutes");
        if (minutesElement) minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
        const secondsElement = document.getElementById("seconds");
        if (secondsElement) secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(countdownInterval);
            const countdownContainer = document.getElementById("countdown");
            if (countdownContainer) countdownContainer.innerHTML = "ACARA TELAH DIMULAI!";
        }
    }, 1000);

    // --- 4. Background Image Slideshow Logic ---
    // (Elements sudah digenerate di fillContentFromConfig())
    let invitationBackgroundSlides = document.querySelectorAll('.background-slider-invitation'); // Re-select elements after generation
    let currentBackgroundSlide = 0;
    
    function showNextBackgroundSlide() {
        if (invitationBackgroundSlides.length === 0) return;
        invitationBackgroundSlides[currentBackgroundSlide].classList.remove('active');
        currentBackgroundSlide = (currentBackgroundSlide + 1) % invitationBackgroundSlides.length;
        invitationBackgroundSlides[currentBackgroundSlide].classList.add('active');
    }
    if (invitationBackgroundSlides.length > 1) {
        setInterval(showNextBackgroundSlide, 7000);
    } else if (invitationBackgroundSlides.length === 1) {
        invitationBackgroundSlides[0].classList.add('active');
    }


    // --- 5. Animate Sections on Scroll (Intersection Observer) ---
    const sections = document.querySelectorAll('.invitation-section');
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animatableElement = entry.target.querySelector('.animate-on-scroll');
                if (animatableElement) {
                    animatableElement.classList.add('in-view');
                }
            } else {
                const animatableElement = entry.target.querySelector('.animate-on-scroll');
                if (animatableElement) {
                    animatableElement.classList.remove('in-view');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- 6. Photo Gallery Slider (Automatic and Manual) ---
    // (Elements sudah digenerate di fillContentFromConfig())
    let gallerySlides = document.querySelectorAll('#gallerySlider .gallery-slide'); 
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    let currentGallerySlide = 0;
    let galleryInterval;
    
    if (gallerySlides.length > 0 && prevBtn && nextBtn) {
        function showGallerySlide(n) {
            gallerySlides[currentGallerySlide].classList.remove('active');
            currentGallerySlide = (n + gallerySlides.length) % gallerySlides.length;
            gallerySlides[currentGallerySlide].classList.add('active');
        }

        function autoSlideGallery() {
            galleryInterval = setInterval(() => {
                showGallerySlide(currentGallerySlide + 1);
            }, 5000);
        }
        
        autoSlideGallery();

        prevBtn.addEventListener('click', () => {
            clearInterval(galleryInterval);
            showGallerySlide(currentGallerySlide - 1);
            autoSlideGallery();
        });
        nextBtn.addEventListener('click', () => {
            clearInterval(galleryInterval);
            showGallerySlide(currentGallerySlide + 1);
            autoSlideGallery();
        });
    }
    
    // --- 7. Copy to Clipboard for Bank Account ---
    const copyButton = document.getElementById('copyRekeningButton');
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-clipboard-text');
            navigator.clipboard.writeText(textToCopy).then(() => {
                alert('Nomor rekening berhasil disalin!');
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        });
    }

    // --- 8. Kirim Pesan via WhatsApp (Formulir Sederhana) ---
    const rsvpForm = document.getElementById('rsvpForm');
    const kirimRsvpButton = document.getElementById('kirimRsvpButton');

    if (rsvpForm && kirimRsvpButton) {
        kirimRsvpButton.addEventListener('click', function() {
            const namaLengkap = document.getElementById('rsvp-nama').value.trim();
            const pesanTambahan = document.getElementById('rsvp-pesan').value.trim();

            if (!namaLengkap || !pesanTambahan) {
                alert('Nama lengkap dan pesan tidak boleh kosong!');
                return;
            }

            const whatsappNumber = weddingConfig.whatsapp.number;

            let prefilledText = `Pesan dari Undangan:\n\n`;
            prefilledText += `Nama: ${namaLengkap}\n`;
            prefilledText += `Pesan: ${pesanTambahan}\n\n`;
            prefilledText += `Terima kasih!`;

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefilledText)}`;

            window.open(whatsappUrl, '_blank');

            alert('Pesan akan dibuka di WhatsApp. Mohon klik kirim di dalam aplikasi WhatsApp.');

            rsvpForm.reset();
        });
    }
});