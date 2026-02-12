// ========== CONSTANTS - FIXED ==========

const Constants = {
    // Initial books data - FIXED AUTHOR NAME
    initialBooks: [
        {
            id: 1,
            title: "Seni Hidup Minimalis",
            author: "Fara Dewi",
            category: "self-improvement",
            description: "Panduan praktis menjalani hidup dengan lebih ringan dan bermakna. Buku ini membahas tentang bagaimana cara melepaskan diri dari belenggu konsumerisme dan menemukan kebahagiaan dalam kesederhanaan.",
            price: "Rp 89.000",
            releaseDate: "2025",
            cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
            isNew: true,
            publisher: "Gramedia Pustaka Utama",
            pages: 256,
            language: "Indonesia",
            isbn: "978-602-1234-56-7"
        },
        {
            id: 2,
            title: "Langit Senja",
            author: "Rama P.",
            category: "fiksi",
            description: "Novel tentang cinta, kehilangan, dan secangkir kopi. Kisah perjalanan seorang barista yang menemukan cinta sejati di tengah hiruk pikuk kota metropolitan.",
            price: "Rp 105.000",
            releaseDate: "2025",
            cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
            isNew: true,
            publisher: "Republika Penerbit",
            pages: 320,
            language: "Indonesia",
            isbn: "978-602-7890-12-3"
        },
        {
            id: 3,
            title: "AI untuk Pemula",
            author: "Dr. Bima S.",
            category: "teknologi",
            description: "Pengantar kecerdasan buatan tanpa coding rumit. Cocok untuk kamu yang ingin memahami dasar-dasar AI dan bagaimana teknologi ini mengubah dunia.",
            price: "Rp 125.000",
            releaseDate: "2024",
            cover: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
            isNew: false,
            publisher: "Informatika",
            pages: 210,
            language: "Indonesia",
            isbn: "978-602-8758-34-9"
        },
        {
            id: 4,
            title: "Filosofi Teras Versi Baru",
            author: "Henry Manampiring", // FIXED: Manampiring, bukan Manampering
            category: "nonfiksi",
            description: "Edisi diperbarui dengan studi kasus kekinian. Buku fenomenal tentang stoisisme yang diaplikasikan dalam kehidupan modern. Membahas bagaimana filosofi kuno bisa menjadi solusi untuk masalah kekinian.",
            price: "Rp 110.000",
            releaseDate: "2025",
            cover: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=400",
            isNew: true,
            publisher: "Kompas",
            pages: 288,
            language: "Indonesia",
            isbn: "978-602-4123-45-6"
        },
        {
            id: 5,
            title: "Sejarah Dunia yang Disembunyikan",
            author: "Jonathan Black",
            category: "sejarah",
            description: "Mengungkap fakta-fakta tersembunyi dalam peradaban manusia. Buku ini membahas berbagai misteri sejarah yang jarang diketahui publik, mulai dari peradaban Atlantis hingga konspirasi besar.",
            price: "Rp 185.000",
            releaseDate: "2025",
            cover: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=400",
            isNew: true,
            publisher: "Kepustakaan Populer Gramedia",
            pages: 450,
            language: "Indonesia",
            isbn: "978-602-4811-23-7"
        },
        {
            id: 6,
            title: "Startup Mindset",
            author: "Ben Horowitz",
            category: "bisnis",
            description: "Panduan membangun perusahaan teknologi dari nol. Berisi pengalaman langsung dari founder perusahaan teknologi terkenal. Membahas tantangan nyata dalam membangun startup.",
            price: "Rp 155.000",
            releaseDate: "2024",
            cover: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400",
            isNew: false,
            publisher: "Bentang Pustaka",
            pages: 342,
            language: "Indonesia",
            isbn: "978-602-2911-56-8"
        },
        {
            id: 7,
            title: "Kebiasaan Atom",
            author: "James Clear",
            category: "self-improvement",
            description: "Cara mudah membangun kebiasaan baik dan menghilangkan kebiasaan buruk. Buku terlaris yang telah mengubah hidup jutaan orang di seluruh dunia.",
            price: "Rp 119.000",
            releaseDate: "2024",
            cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400",
            isNew: false,
            publisher: "Gramedia Pustaka Utama",
            pages: 352,
            language: "Indonesia",
            isbn: "978-602-0653-45-7"
        },
        {
            id: 8,
            title: "Rekayasa Perangkat Lunak",
            author: "Ian Sommerville",
            category: "teknologi",
            description: "Dasar-dasar rekayasa perangkat lunak untuk pemula. Buku teks yang digunakan di berbagai universitas terkemuka. Mencakup seluruh siklus pengembangan perangkat lunak.",
            price: "Rp 210.000",
            releaseDate: "2025",
            cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
            isNew: true,
            publisher: "Erlangga",
            pages: 520,
            language: "Indonesia",
            isbn: "978-602-2987-89-1"
        }
    ],
    
    // Initial users data
    initialUsers: [
        { 
            id: 1,
            fullname: "Admin Perpustakaan", 
            username: "admin", 
            password: "admin123", 
            role: "admin" 
        },
        { 
            id: 2,
            fullname: "Pembaca Setia", 
            username: "user", 
            password: "user123", 
            role: "user" 
        }
    ],
    
    // Book categories
    categories: [
        { value: "fiksi", label: "Fiksi" },
        { value: "nonfiksi", label: "Nonfiksi" },
        { value: "teknologi", label: "Teknologi" },
        { value: "self-improvement", label: "Self Improvement" },
        { value: "sejarah", label: "Sejarah" },
        { value: "bisnis", label: "Bisnis" }
    ],
    
    // Sort options
    sortOptions: [
        { value: "newest", label: "Terbaru" },
        { value: "oldest", label: "Terlama" },
        { value: "title-asc", label: "Judul A-Z" },
        { value: "title-desc", label: "Judul Z-A" },
        { value: "price-low", label: "Harga Terendah" },
        { value: "price-high", label: "Harga Tertinggi" }
    ]
};