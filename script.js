// ========== MAIN SCRIPT - BUKUKU ==========

// Global App State
window.appState = {
    booksData: [],
    usersData: [],
    currentUser: null,
    currentCategory: 'all',
    currentPage: 1,
    itemsPerPage: 8,
    searchTerm: '',
    currentSort: 'newest',
    currentMenu: 'home',
    showingNewBooksOnly: false
};

// UI Controller
const UI = {
    // Show home page
    showHome: function() {
        const hero = document.getElementById('hero-container');
        const books = document.getElementById('books-container');
        const filter = document.getElementById('filter-container');
        const contact = document.getElementById('contact-container');
        const admin = document.getElementById('admin-container');
        
        if (hero) hero.style.display = window.appState.currentUser ? 'none' : 'block';
        if (books) books.style.display = 'block';
        if (filter) filter.style.display = window.appState.currentUser?.role === 'admin' ? 'none' : 'block';
        if (contact) contact.style.display = 'none';
        if (admin) admin.style.display = window.appState.currentUser?.role === 'admin' ? 'block' : 'none';
        
        window.appState.showingNewBooksOnly = false;
        window.appState.currentCategory = 'all';
        window.appState.currentPage = 1;
        
        // Reset filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.dataset.category === 'all') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        Books.render();
    },
    
    // Show new books
    showNewBooks: function() {
        const hero = document.getElementById('hero-container');
        const books = document.getElementById('books-container');
        const filter = document.getElementById('filter-container');
        const contact = document.getElementById('contact-container');
        const admin = document.getElementById('admin-container');
        
        if (hero) hero.style.display = 'none';
        if (books) books.style.display = 'block';
        if (filter) filter.style.display = window.appState.currentUser?.role === 'admin' ? 'none' : 'block';
        if (contact) contact.style.display = 'none';
        if (admin) admin.style.display = window.appState.currentUser?.role === 'admin' ? 'block' : 'none';
        
        window.appState.showingNewBooksOnly = true;
        window.appState.currentCategory = 'all';
        window.appState.currentPage = 1;
        
        // Reset filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.dataset.category === 'all') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        Books.render();
        Toast.show('Menampilkan buku terbaru 2025! 📚', 'info');
    },
    
    // Show contact page
    showContact: function() {
        const hero = document.getElementById('hero-container');
        const books = document.getElementById('books-container');
        const filter = document.getElementById('filter-container');
        const contact = document.getElementById('contact-container');
        const admin = document.getElementById('admin-container');
        
        if (hero) hero.style.display = 'none';
        if (books) books.style.display = 'none';
        if (filter) filter.style.display = 'none';
        if (admin) admin.style.display = 'none';
        if (contact) contact.style.display = 'block';
        
        setTimeout(() => {
            contact.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    },
    
    // Update UI based on user
    updateForUser: function() {
        Navbar.updateAuthButtons(window.appState.currentUser);
        
        if (window.appState.currentUser) {
            document.getElementById('hero-container').style.display = 'none';
            
            if (window.appState.currentUser.role === 'admin') {
                document.getElementById('admin-container').style.display = 'block';
                document.getElementById('filter-container').style.display = 'none';
                Admin.updateStats();
            } else {
                document.getElementById('admin-container').style.display = 'none';
                document.getElementById('filter-container').style.display = 'block';
            }
        } else {
            document.getElementById('hero-container').style.display = 'block';
            document.getElementById('admin-container').style.display = 'none';
            document.getElementById('filter-container').style.display = 'block';
        }
        
        Navbar.updateActiveMenu(window.appState.currentMenu);
    }
};

// Initialize all components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize storage
    window.appState.booksData = Storage.getBooks();
    window.appState.usersData = Storage.getUsers();
    window.appState.currentUser = Storage.getCurrentUser();
    
    // Set initial state
    window.appState.currentMenu = 'home';
    
    // Render all components
    Hero.render();
    Admin.render();
    Contact.render();
    Logout.renderModal();
    DeleteAccount.renderModal();
    
    // Update UI
    UI.updateForUser();
    Books.render();
});