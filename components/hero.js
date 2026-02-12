// ========== HERO COMPONENT ==========

const Hero = {
    // Render hero section
    render: function() {
        const container = document.getElementById('hero-container');
        if (!container) return;
        
        container.innerHTML = `
            <section class="hero-section">
                <div class="hero-container">
                    <h1 class="hero-title">Temukan Buku Baru Rilis Setiap Hari</h1>
                    <p class="hero-subtitle">Dari penulis terbaik, langsung ke rak bukumu.</p>
                    <button class="hero-btn" onclick="Auth.openLoginModal()">
                        Mulai Membaca
                    </button>
                </div>
            </section>
        `;
    }
};