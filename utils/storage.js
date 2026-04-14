// ========== STORAGE MANAGEMENT ==========

const Storage = {
    // ----- BOOKS -----
    getBooks: async function() {
        try {
            const response = await fetch('/api/books');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching books:', error);
            return [];
        }
    },
    
    addBook: async function(book) {
        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book)
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding book:', error);
        }
    },
    
    updateBook: async function(bookId, updatedBook) {
        try {
            const response = await fetch(`/api/books?id=${bookId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedBook)
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating book:', error);
        }
    },
    
    deleteBook: async function(bookId) {
        try {
            await fetch(`/api/books?id=${bookId}`, { method: 'DELETE' });
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    },
    
    // ----- AUTH & USERS -----
    login: async function(username, password) {
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'login', username, password })
            });
            const result = await response.json();
            if (result.status === 'success') {
                this.saveUser(result.user);
            }
            return result;
        } catch (error) {
            console.error('Error during login:', error);
            return { error: 'Terjadi kesalahan koneksi' };
        }
    },

    register: async function(user) {
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'register', ...user })
            });
            return await response.json();
        } catch (error) {
            console.error('Error during registration:', error);
            return { error: 'Terjadi kesalahan koneksi' };
        }
    },
    
    // ----- CURRENT SESSION (Tetap di LocalStorage untuk Session Tok) -----
    getCurrentUser: function() {
        const storedUser = localStorage.getItem('bukuku_user');
        return storedUser ? JSON.parse(storedUser) : null;
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