// ========== NAVBAR COMPONENT - MOBILE FIRST ==========

const Navbar = {
    // Render navbar ke container
    render: function() {
        const container = document.getElementById('navbar-container');
        if (!container) return;
        
        container.innerHTML = `
            <nav>
                <div class="nav-container">
                    <h1 class="logo" onclick="Navbar.scrollToTop()">📖 Bukuku</h1>
                    
                    <button class="hamburger" id="hamburgerBtn" onclick="Navbar.toggleMenu()">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    
                    <div class="nav-right" id="navRight">
                        <ul id="navMenu">
                            <li><a href="#" onclick="Navbar.showHome(); Navbar.closeMenu(); return false;">Beranda</a></li>
                            <li><a href="#" onclick="Navbar.showNewBooks(); Navbar.closeMenu(); return false;">Buku Baru</a></li>
                            <li><a href="#" onclick="Navbar.showContact(); Navbar.closeMenu(); return false;">Kontak</a></li>
                        </ul>
                        <div id="authButtons"></div>
                    </div>
                </div>
            </nav>
        `;
    },
    
    // Toggle mobile menu
    toggleMenu: function() {
        const navRight = document.getElementById('navRight');
        const hamburger = document.getElementById('hamburgerBtn');
        
        if (navRight && hamburger) {
            navRight.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navRight.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    },
    
    // Close mobile menu
    closeMenu: function() {
        const navRight = document.getElementById('navRight');
        const hamburger = document.getElementById('hamburgerBtn');
        
        if (navRight && hamburger) {
            navRight.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    },
    
    // Update auth buttons berdasarkan status login
    updateAuthButtons: function(user) {
        const authButtons = document.getElementById('authButtons');
        if (!authButtons) return;
        
        if (user) {
            authButtons.innerHTML = `
                <div class="user-info" style="position: relative;">
                    <span class="user-name">${user.fullname}</span>
                    ${user.role === 'admin' ? '<span class="admin-badge">Admin</span>' : ''}
                    
                    <div style="position: relative; display: inline-block;">
                        <button onclick="Navbar.toggleUserMenu()" style="background: none; border: none; color: white; cursor: pointer; padding: 0.3rem;">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        
                        <div id="userMenuDropdown" class="user-menu-dropdown">
                            <div class="dropdown-header">
                                <p>${user.fullname}</p>
                                <p>@${user.username}</p>
                            </div>
                            
                            <div style="padding: 0.5rem;">
                                ${user.role !== 'admin' ? `
                                    <button class="dropdown-item delete" onclick="DeleteAccount.openModal(); Navbar.toggleUserMenu(); Navbar.closeMenu();">
                                        <i class="fas fa-trash-alt"></i> Hapus Akun
                                    </button>
                                ` : `
                                    <div style="padding: 0.8rem 1rem; color: #8b7355; display: flex; align-items: center; gap: 0.8rem; background: #f1e6d8; border-radius: 8px;">
                                        <i class="fas fa-shield-alt" style="color: #c17b4c;"></i> Akun Admin
                                    </div>
                                `}
                                
                                <div class="dropdown-divider"></div>
                                
                                <button class="dropdown-item" onclick="Logout.openConfirmationModal(); Navbar.toggleUserMenu(); Navbar.closeMenu();">
                                    <i class="fas fa-sign-out-alt" style="color: #c17b4c;"></i> Keluar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            authButtons.innerHTML = `
                <div class="auth-buttons">
                    <button class="btn-login-nav" onclick="Auth.openLoginModal(); Navbar.closeMenu();">
                        <i class="fas fa-sign-in-alt"></i> Masuk
                    </button>
                </div>
            `;
        }
    },
    
    // Toggle dropdown menu
    toggleUserMenu: function() {
        const dropdown = document.getElementById('userMenuDropdown');
        if (!dropdown) return;
        
        dropdown.classList.toggle('show');
        
        if (dropdown.classList.contains('show')) {
            setTimeout(() => {
                window.addEventListener('click', function closeMenu(e) {
                    if (!e.target.closest('.user-info') && !e.target.closest('.user-menu-dropdown')) {
                        dropdown.classList.remove('show');
                        window.removeEventListener('click', closeMenu);
                    }
                });
            }, 100);
        }
    },
    
    // Update active menu
    updateActiveMenu: function(menu) {
        const menuItems = document.querySelectorAll('#navMenu a');
        menuItems.forEach(item => {
            item.classList.remove('nav-active');
        });
        
        if (menu === 'home' && menuItems[0]) {
            menuItems[0].classList.add('nav-active');
        } else if (menu === 'newbooks' && menuItems[1]) {
            menuItems[1].classList.add('nav-active');
        } else if (menu === 'contact' && menuItems[2]) {
            menuItems[2].classList.add('nav-active');
        }
    },
    
    // Scroll to top
    scrollToTop: function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.appState.currentMenu = 'home';
        this.updateActiveMenu('home');
        UI.showHome();
    },
    
    // Show home
    showHome: function() {
        window.appState.currentMenu = 'home';
        this.updateActiveMenu('home');
        UI.showHome();
    },
    
    // Show new books
    showNewBooks: function() {
        if (!window.appState.currentUser) {
            Toast.show('Silakan login untuk melihat buku baru!', 'warning');
            Auth.openLoginModal();
            return;
        }
        
        window.appState.currentMenu = 'newbooks';
        this.updateActiveMenu('newbooks');
        UI.showNewBooks();
    },
    
    // Show contact
    showContact: function() {
        window.appState.currentMenu = 'contact';
        this.updateActiveMenu('contact');
        UI.showContact();
    }
};

// Initialize navbar
document.addEventListener('DOMContentLoaded', function() {
    Navbar.render();
});