// ========== STORAGE MANAGEMENT ==========

const Storage = {
    // ----- BOOKS -----
    getBooks: function() {
        const storedBooks = localStorage.getItem('bukuku_books');
        if (storedBooks) {
            return JSON.parse(storedBooks);
        } else {
            this.initializeBooks();
            return Constants.initialBooks;
        }
    },
    
    initializeBooks: function() {
        localStorage.setItem('bukuku_books', JSON.stringify(Constants.initialBooks));
        window.appState.booksData = Constants.initialBooks;
    },
    
    saveBooks: function(books) {
        localStorage.setItem('bukuku_books', JSON.stringify(books));
        window.appState.booksData = books;
    },
    
    addBook: function(book) {
        const books = this.getBooks();
        books.push(book);
        this.saveBooks(books);
    },
    
    updateBook: function(bookId, updatedBook) {
        const books = this.getBooks();
        const index = books.findIndex(b => b.id === bookId);
        if (index !== -1) {
            books[index] = { ...books[index], ...updatedBook };
            this.saveBooks(books);
        }
    },
    
    deleteBook: function(bookId) {
        const books = this.getBooks();
        const filtered = books.filter(book => book.id !== bookId);
        this.saveBooks(filtered);
    },
    
    getBookById: function(bookId) {
        const books = this.getBooks();
        return books.find(b => b.id === bookId);
    },
    
    // ----- USERS -----
    getUsers: function() {
        const storedUsers = localStorage.getItem('bukuku_users');
        if (storedUsers) {
            return JSON.parse(storedUsers);
        } else {
            this.initializeUsers();
            return Constants.initialUsers;
        }
    },
    
    initializeUsers: function() {
        localStorage.setItem('bukuku_users', JSON.stringify(Constants.initialUsers));
        window.appState.usersData = Constants.initialUsers;
    },
    
    saveUsers: function(users) {
        localStorage.setItem('bukuku_users', JSON.stringify(users));
        window.appState.usersData = users;
    },
    
    addUser: function(user) {
        const users = this.getUsers();
        users.push(user);
        this.saveUsers(users);
    },
    
    deleteUser: function(userId) {
        const users = this.getUsers();
        const filtered = users.filter(u => u.id !== userId);
        this.saveUsers(filtered);
    },
    
    // ----- CURRENT USER -----
    getCurrentUser: function() {
        const storedUser = localStorage.getItem('bukuku_user');
        if (storedUser) {
            return JSON.parse(storedUser);
        }
        return null;
    },
    
    saveUser: function(user) {
        localStorage.setItem('bukuku_user', JSON.stringify(user));
        window.appState.currentUser = user;
    },
    
    clearUser: function() {
        localStorage.removeItem('bukuku_user');
        window.appState.currentUser = null;
    }
};