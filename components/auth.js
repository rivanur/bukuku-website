// ========== AUTH COMPONENT ==========

const Auth = {
    // Open login modal
    openLoginModal: function() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    },
    
    // Open register modal
    openRegisterModal: function() {
        const modal = document.getElementById('registerModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    },
    
    // Close modal
    closeModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    },
    
    // Render login modal
    renderLoginModal: function() {
        const container = document.getElementById('login-modal-container');
        if (!container) return;
        
        container.innerHTML = `
            <div id="loginModal" class="modal">
                <div class="modal-content">
                    <span class="close" onclick="Auth.closeModal('loginModal')">&times;</span>
                    <h2>Masuk ke Bukuku</h2>
                    <div class="role-selector">
                        <button class="role-btn active" data-role="user">Pembaca</button>
                        <button class="role-btn" data-role="admin">Pengelola</button>
                    </div>
                    <form id="loginForm">
                        <input type="text" id="loginUsername" placeholder="Nama Pengguna" required>
                        <input type="password" id="loginPassword" placeholder="Kata Sandi" required>
                        <button type="submit" class="btn-login">Masuk</button>
                    </form>
                    <p class="switch-form">
                        Belum punya akun? <a href="#" id="showRegister">Daftar disini</a>
                    </p>
                </div>
            </div>
        `;
        
        this.attachLoginEvents();
    },
    
    // Render register modal
    renderRegisterModal: function() {
        const container = document.getElementById('register-modal-container');
        if (!container) return;
        
        container.innerHTML = `
            <div id="registerModal" class="modal">
                <div class="modal-content">
                    <span class="close" onclick="Auth.closeModal('registerModal')">&times;</span>
                    <h2>Daftar Akun Baru</h2>
                    <div class="role-selector">
                        <button class="role-btn active" data-role="user">Pembaca</button>
                        <button class="role-btn" data-role="admin">Pengelola</button>
                    </div>
                    <form id="registerForm">
                        <input type="text" id="regFullname" placeholder="Nama Lengkap" required>
                        <input type="text" id="regUsername" placeholder="Nama Pengguna" required>
                        <input type="password" id="regPassword" placeholder="Kata Sandi" required>
                        <input type="password" id="regConfirmPassword" placeholder="Konfirmasi Kata Sandi" required>
                        <button type="submit" class="btn-login">Daftar</button>
                    </form>
                    <p class="switch-form">
                        Sudah punya akun? <a href="#" id="showLogin">Masuk disini</a>
                    </p>
                </div>
            </div>
        `;
        
        this.attachRegisterEvents();
    },
    
    // Attach login events
    attachLoginEvents: function() {
        const form = document.getElementById('loginForm');
        if (!form) return;
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            const role = e.target.closest('.modal-content').querySelector('.role-btn.active').dataset.role;
            
            const result = await Storage.login(username, password);
            
            if (result.status === 'success') {
                const user = result.user;
                
                // Cek role (Opsional, jika ingin membatasi login admin/user)
                if (user.role !== role) {
                    Toast.show(`Role akun ini adalah ${user.role}, bukan ${role}!`, 'error');
                    return;
                }

                Auth.closeModal('loginModal');
                
                window.appState.currentMenu = 'home';
                Navbar.updateActiveMenu('home');
                Navbar.updateAuthButtons(window.appState.currentUser);
                UI.updateForUser();
                
                // Refresh books data dari DB
                window.appState.booksData = await Storage.getBooks();
                Books.render();
                
                Toast.show(`Selamat datang, ${user.fullname}!`);
                this.reset();
            } else {
                Toast.show(result.error || 'Username/password salah!', 'error');
            }
        });
        
        // Switch to register
        document.getElementById('showRegister')?.addEventListener('click', function(e) {
            e.preventDefault();
            Auth.closeModal('loginModal');
            Auth.openRegisterModal();
        });
    },
    
    // Attach register events
    attachRegisterEvents: function() {
        const form = document.getElementById('registerForm');
        if (!form) return;
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const fullname = document.getElementById('regFullname').value;
            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            const role = e.target.closest('.modal-content').querySelector('.role-btn.active').dataset.role;
            
            if (password !== confirmPassword) {
                Toast.show('Konfirmasi password tidak cocok!', 'error');
                return;
            }
            
            if (password.length < 6) {
                Toast.show('Password minimal 6 karakter!', 'error');
                return;
            }
            
            const result = await Storage.register({
                fullname,
                username,
                password,
                role
            });
            
            if (result.error) {
                Toast.show(result.error, 'error');
                return;
            }
            
            Toast.show('Registrasi berhasil! Silakan login.');
            Auth.closeModal('registerModal');
            Auth.openLoginModal();
            this.reset();
        });
        
        // Switch to login
        document.getElementById('showLogin')?.addEventListener('click', function(e) {
            e.preventDefault();
            Auth.closeModal('registerModal');
            Auth.openLoginModal();
        });
    },
    
    // Initialize role button listeners
    initRoleButtons: function() {
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('role-btn')) {
                const container = e.target.closest('.role-selector');
                container.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    }
};

// Initialize auth modals
document.addEventListener('DOMContentLoaded', function() {
    Auth.renderLoginModal();
    Auth.renderRegisterModal();
    Auth.initRoleButtons();
});