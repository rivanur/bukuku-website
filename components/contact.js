// ========== CONTACT COMPONENT ==========

const Contact = {
    // Render contact section
    render: function() {
        const container = document.getElementById('contact-container');
        if (!container) return;
        
        container.innerHTML = `
            <section class="contact-section">
                <div class="contact-container">
                    <h2><i class="fas fa-envelope"></i> Hubungi Kami</h2>
                    <div class="contact-content">
                        <div class="contact-info">
                            <div class="contact-card">
                                <i class="fas fa-map-marker-alt"></i>
                                <h3>Alamat</h3>
                                <p>Jl. Buku Indah No. 123</p>
                                <p>Jakarta, Indonesia 12345</p>
                            </div>
                            <div class="contact-card">
                                <i class="fas fa-phone"></i>
                                <h3>Telepon</h3>
                                <p>(021) 1234-5678</p>
                                <p>Senin - Jumat, 09:00 - 17:00</p>
                            </div>
                            <div class="contact-card">
                                <i class="fas fa-envelope"></i>
                                <h3>Email</h3>
                                <p>info@bukuku.id</p>
                                <p>bantuan@bukuku.id</p>
                            </div>
                            <div class="contact-card">
                                <i class="fas fa-clock"></i>
                                <h3>Jam Operasional</h3>
                                <p>Senin - Jumat: 09:00 - 20:00</p>
                                <p>Sabtu - Minggu: 10:00 - 18:00</p>
                            </div>
                        </div>
                        
                        <div class="contact-form-container">
                            <h3>Kirim Pesan</h3>
                            <form id="contactForm" class="contact-form">
                                <div class="form-row">
                                    <input type="text" id="contactName" placeholder="Nama Lengkap" required>
                                    <input type="email" id="contactEmail" placeholder="Email" required>
                                </div>
                                <input type="text" id="contactSubject" placeholder="Subjek" required>
                                <textarea id="contactMessage" placeholder="Pesan Anda..." rows="5" required></textarea>
                                <button type="submit" class="btn-send">
                                    <i class="fas fa-paper-plane"></i> Kirim Pesan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        this.attachContactFormEvent();
    },
    
    // Attach contact form event
    attachContactFormEvent: function() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            
            if (name && email && subject && message) {
                Toast.show(`Terima kasih ${name}! Pesan Anda telah terkirim.`, 'success');
                this.reset();
            } else {
                Toast.show('Harap isi semua field!', 'error');
            }
        });
    }
};