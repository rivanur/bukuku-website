// ========== DELETE ACCOUNT COMPONENT ==========

const DeleteAccount = {
    // Render delete account confirmation modal
    renderModal: function() {
        const container = document.getElementById('delete-account-modal-container');
        if (!container) return;
        
        container.innerHTML = `
            <div id="deleteAccountModal" class="modal">
                <div class="modal-content" style="max-width: 450px;">
                    <span class="close" onclick="DeleteAccount.closeModal()">&times;</span>
                    <div style="text-align: center;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #b45f4a; margin-bottom: 1rem;"></i>
                        <h2 style="color: #4a3b2c; margin-bottom: 1rem;">Hapus Akun</h2>
                        <p style="color: #6b4f3a; margin-bottom: 0.5rem;" id="deleteAccountUserName"></p>
                        <p style="color: #6b4f3a; margin-bottom: 1.5rem;">
                            Apakah Anda yakin?<br>
                            <span style="color: #b45f4a; font-weight: 600;">Semua data akan hilang permanen!</span>
                        </p>
                        
                        <form id="deleteAccountForm">
                            <input type="password" id="deletePassword" placeholder="Masukkan password" required 
                                style="width: 100%; margin-bottom: 1rem; border: 2px solid #ecd8b4; padding: 1rem; border-radius: 12px;">
                            <div style="display: flex; gap: 1rem;">
                                <button type="button" onclick="DeleteAccount.closeModal()" 
                                    style="flex: 1; padding: 0.8rem; background: #e6b0a2; color: #6b2e1e; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">
                                    Batal
                                </button>
                                <button type="submit" 
                                    style="flex: 1; padding: 0.8rem; background: #b45f4a; color: white; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">
                                    <i class="fas fa-trash"></i> Hapus
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        this.attachFormEvent();
    },
    
    // Open modal
    openModal: function() {
        if (!window.appState.currentUser) {
            Toast.show('Anda harus login terlebih dahulu!', 'error');
            return;
        }
        
        if (window.appState.currentUser.role === 'admin') {
            Toast.show('Admin tidak dapat menghapus akun!', 'warning');
            return;
        }
        
        const modal = document.getElementById('deleteAccountModal');
        const userNameElement = document.getElementById('deleteAccountUserName');
        
        if (modal && userNameElement) {
            userNameElement.innerHTML = `<strong>${window.appState.currentUser.fullname}</strong> (${window.appState.currentUser.username})`;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    },
    
    // Close modal
    closeModal: function() {
        const modal = document.getElementById('deleteAccountModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    },
    
    // Attach form event
    attachFormEvent: function() {
        const form = document.getElementById('deleteAccountForm');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            DeleteAccount.confirm();
        });
    },
    
    // Confirm delete account
    confirm: function() {
        const password = document.getElementById('deletePassword').value;
        
        if (!password) {
            Toast.show('Password harus diisi!', 'error');
            return;
        }
        
        const user = Storage.getUsers().find(u => u.id === window.appState.currentUser.id);
        
        if (!user) {
            Toast.show('Akun tidak ditemukan!', 'error');
            this.closeModal();
            return;
        }
        
        if (user.password !== password) {
            Toast.show('Password salah!', 'error');
            return;
        }
        
        if (confirm('PERINGATAN TERAKHIR: Hapus akun permanen?')) {
            this.deleteAccount();
        }
    },
    
    // Delete account
    deleteAccount: function() {
        const userId = window.appState.currentUser.id;
        const userName = window.appState.currentUser.fullname;
        
        // Delete user from storage
        Storage.deleteUser(userId);
        
        // Clear current user
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
        
        // Render books
        Books.render();
        
        // Show toast
        Toast.show(`Akun "${userName}" telah dihapus. Terima kasih!`, 'info');
    }
};