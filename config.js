// File konfigurasi terpusat untuk seluruh undangan pernikahan
const weddingConfig = {

    couple: {
        bride: {
            firstName: "Nining",
            fullName: "Risti Yaningrum", // Pastikan ini sesuai dengan nama di image profile
            father: "Waris Muharjo",
            mother: "Kusiyem"
        },
        groom: {
            firstName: "Puji",
            fullName: "Pujiyanto", // Pastikan ini sesuai dengan nama di image profile
            father: "Sunarto (Alm)",
            mother: "Saminah"
        }
        // names akan diisi otomatis dari firstName bride & groom jika tidak disetel
    },
    event: {
        introDate: "Jumat, 18 September 2026",
        countdownDate: new Date("September 18, 2026 00:00:00").getTime(), // Bulan dimulai dari 0 (Januari=0, Oktober=9)
        akad: {
            date: "Jumat, 18 September 2026",
            time: "Pukul 08:00 WIB",
            location: "di Kediaman Mempelai Perempuan",
            googleCalendarLink: "https://calendar.google.com/contohakad" // Ganti dengan link Google Calendar Akad
        },
        resepsi: {
            dateTime: "Jumat, 18 September 2026 | Pukul 08:00 - Selesai",
            locationName: "Kediaman Mempelai Perempuan",
            address: "Dsn. Klumprit Wetan, RT 03/RW 05 Desa Klumprit, Kec. Nusawungu, Kab. Cilacap",
            googleMapsLink: "https://maps.app.goo.gl/BrAHmYRcgVsGTdhV8" // Ganti dengan link Google Maps Resepsi
        },
        
    },
    
    bank: [
        {
            name: "DANA",
            accountNumber: "088224175114", // Nomor rekening Anda
            accountName: "Risti Yaningrum" // Atas nama rekening
        }
    ],
    whatsapp: {
        number: "6288224175114" // Ganti dengan nomor WhatsApp Anda (tanpa + atau 00, contoh: 6281234567890)
    },
    // --- KONFIGURASI GAMBAR --- 
    images: {
        coupleIntro: 'assets/cp1.jpeg', // Foto pasangan di intro invitation.html
        brideProfile: 'assets/per1.jpeg', // Foto profil pengantin wanita
        groomProfile: 'assets/laki1.jpeg', // Foto profil pengantin pria
        story: [ // Daftar foto story - TAMBAH/KURANGI FOTO DI SINI SAJA
            'assets/cp2.jpeg', 
            'assets/story2.jpg'
        ],
        gallery: [ // Daftar foto galeri - TAMBAH/KURANGI FOTO DI SINI SAJA
            'assets/cp1.jpeg',
            'assets/cp2.jpeg',
            'assets/cp3.jpeg',
            'assets/cp4.jpeg'
        ],
        backgrounds: [ // Daftar foto background slideshow (untuk index.html dan invitation.html)
            'assets/cp1.jpeg',
            'assets/cp2.jpeg',
            'assets/cp3.jpeg',
            'assets/cp4.jpeg'
        ],
        
    }
};

// Fungsi untuk menginisialisasi konfigurasi (termasuk mengisi nilai otomatis)
function initializeConfig() {
    // Generate nama pasangan jika belum disetel
    if (!weddingConfig.couple.names) {
        weddingConfig.couple.names = `${weddingConfig.couple.bride.firstName} & ${weddingConfig.couple.groom.firstName}`;
    }
}

// Ekspor konfigurasi agar bisa digunakan di file JavaScript lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { weddingConfig, initializeConfig };
} else {
    // Untuk browser, jadikan global
    window.weddingConfig = weddingConfig;
    window.initializeConfig = initializeConfig;
    
    // Panggil fungsi inisialisasi secara otomatis
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeConfig);
    } else {
        // Jika DOM sudah selesai dimuat, panggil langsung
        initializeConfig();
    }
}