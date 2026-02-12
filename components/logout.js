// ========== LOGOUT COMPONENT ==========

const Logout = {
    // Render logout confirmation modal
    renderModal: function() {
        const container = document.getElementById('logout-modal-container');
        if (!container) return;
        
        container.innerHTML = `
            <div id="logoutConfirmationModal" class="modal">
                <div class="modal-content" style="max-width: 400px; text-align: center;">
                    <span class="close" onclick="Logout.closeModal()">&times;</span>
                    
                    <div style="padding: 1rem 0;">
                        <div style="background: #f1e6d8; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-sign-out-alt" style="font-size: 2.5rem; color: #c17b4c;"></i>
                        </div>
                        
                        <h2 style="color: #4a3b2c; margin-bottom: 0.5rem; font-size: 1.8rem;">Keluar Akun?</h2>
                        
                        <p style="color: #6b4f3a; margin-bottom: 2rem;" id="logoutUserName"></p>
                        
                        <div style="display: flex; gap: 1rem;">
                            <button onclick="Logout.closeModal()" 
                                style="flex: 1; padding: 1rem; background: #ecd8b4; color: #6b4f3a; border: none; border-radius: 12px; font-weight: 600; font-size: 1rem; cursor: pointer;">
                                <i class="fas fa-times"></i> Batal
                            </button>
                            
                            <button onclick="Logout.confirm()" 
                                style="flex: 1; padding: 1rem; background: #c17b4c; color: white; border: none; border-radius: 12px; font-weight: 600; font-size: 1rem; cursor: pointer;">
                                <i class="fas fa-sign-out-alt"></i> Ya, Keluar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Open confirmation modal
    openConfirmationModal: function() {
        if (!window.appState.currentUser) {
            Toast.show('Anda belum login!', 'error');
            return;
        }
        
        const modal = document.getElementById('logoutConfirmationModal');
        const userNameElement = document.getElementById('logoutUserName');
        
        if (modal && userNameElement) {
            userNameElement.innerHTML = `<strong>${window.appState.currentUser.fullname}</strong>`;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    },
    
    // Close modal
    closeModal: function() {
        const modal = document.getElementById('logoutConfirmationModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    },
    
    // Confirm logout
    confirm: function() {
        const userName = window.appState.currentUser?.fullname || 'Pengguna';
        
        // Clear user data
        window.appState.currentUser = null;
        Storage.clearUser();
        
        // Close modal
        this.closeModal();
        
        // Update UI
        Navbar.updateAuthButtons(null);
        UI.updateForUser();
        
        // Reset to home
        window.appState.currentMenu = 'home';
        Navbar.updateActiveMenu('home');
        
        // Reset filters
        window.appState.currentCategory = 'all';
        window.appState.searchTerm = '';
        window.appState.currentPage = 1;
        window.appState.currentSort = 'newest';
        
        // Reset search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
        
        // Reset sort select
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) sortSelect.value = 'newest';
        
        // Reset filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.dataset.category === 'all') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Render books
        Books.render();
        
        // Show toast
        Toast.show(`Sampai jumpa, ${userName}! 👋`, 'info');
    }
};