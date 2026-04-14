// ========== ADMIN COMPONENT ==========

const Admin = {
    // Render admin dashboard
    render: function() {
        const container = document.getElementById('admin-container');
        if (!container) return;
        
        container.innerHTML = `
            <section class="admin-section">
                <div class="admin-container">
                    <h2>Panel Pengelola</h2>
                    
                    <div class="stats-container">
                        <div class="stat-card">
                            <i class="fas fa-book"></i>
                            <div class="stat-info">
                                <h3 id="totalBooksStat">0</h3>
                                <p>Total Buku</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-users"></i>
                            <div class="stat-info">
                                <h3 id="totalUsersStat">0</h3>
                                <p>Total Pembaca</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-calendar"></i>
                            <div class="stat-info">
                                <h3 id="newBooksStat">0</h3>
                                <p>Buku 2025</p>
                            </div>
                        </div>
                    </div>

                    <div class="add-book-form">
                        <h3>Tambah Buku Baru</h3>
                        <form id="addBookForm">
                            <div class="form-row">
                                <input type="text" id="bookTitle" placeholder="Judul Buku" required>
                                <input type="text" id="bookAuthor" placeholder="Penulis" required>
                            </div>
                            <div class="form-row">
                                <select id="bookCategory" required>
                                    <option value="">Pilih Kategori</option>
                                    ${Constants.categories.map(cat => 
                                        `<option value="${cat.value}">${cat.label}</option>`
                                    ).join('')}
                                </select>
                                <input type="url" id="bookCover" placeholder="URL Gambar Sampul (opsional)">
                            </div>
                            <textarea id="bookDesc" placeholder="Deskripsi Buku" rows="3" required></textarea>
                            <div class="form-row">
                                <input type="number" id="bookPrice" placeholder="Harga (misal: 85000.50)" step="0.01" required>
                                <input type="date" id="bookReleaseDate" required title="Tanggal Rilis">
                            </div>
                            <button type="submit" class="btn-add">
                                <i class="fas fa-plus"></i> Tambah Buku
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        `;
        
        this.attachAddBookEvent();
    },
    
    // Update admin stats
    updateStats: function() {
        const books = window.appState.booksData || [];
        // Untuk users, sementara kita hardcode atau biarkan 1 sampai API Users lengkap
        const usersCount = window.appState.currentUser ? 1 : 0; 
        
        document.getElementById('totalBooksStat').textContent = books.length;
        document.getElementById('totalUsersStat').textContent = usersCount;
        
        const books2025 = books.filter(book => book.releaseDate === '2025').length;
        document.getElementById('newBooksStat').textContent = books2025;
    },
    
    // Attach add book event
    attachAddBookEvent: function() {
        const form = document.getElementById('addBookForm');
        if (!form) return;
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (window.appState.currentUser?.role !== 'admin') {
                Toast.show('Anda bukan admin!', 'error');
                return;
            }
            
            const newBook = {
                title: document.getElementById('bookTitle').value,
                author: document.getElementById('bookAuthor').value,
                category: document.getElementById('bookCategory').value,
                cover: document.getElementById('bookCover').value,
                description: document.getElementById('bookDesc').value,
                price: document.getElementById('bookPrice').value,
                releaseDate: document.getElementById('bookReleaseDate').value,
                isNew: document.getElementById('bookReleaseDate').value.startsWith('2025')
            };
            
            await Storage.addBook(newBook);
            
            // Refresh data
            window.appState.booksData = await Storage.getBooks();
            
            Books.render();
            Admin.updateStats();
            this.reset();
            Toast.show('Buku berhasil ditambahkan!');
        });
    },
    
    // Open edit book modal
    openEditModal: function(bookId) {
        if (window.appState.currentUser?.role !== 'admin') return;
        
        const book = window.appState.booksData.find(b => b.id === bookId);
        if (!book) return;
        
        const modalContainer = document.getElementById('edit-book-modal-container');
        modalContainer.innerHTML = `
            <div id="editBookModal" class="modal" style="display: block;">
                <div class="modal-content modal-large">
                    <span class="close" onclick="Admin.closeEditModal()">&times;</span>
                    <h2>Edit Buku</h2>
                    <form id="editBookForm">
                        <input type="hidden" id="editBookId" value="${book.id}">
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Judul Buku</label>
                                <input type="text" id="editBookTitle" value="${book.title}" required>
                            </div>
                            <div class="form-group">
                                <label>Penulis</label>
                                <input type="text" id="editBookAuthor" value="${book.author}" required>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>Kategori</label>
                                <select id="editBookCategory" required>
                                    ${Constants.categories.map(cat => 
                                        `<option value="${cat.value}" ${book.category === cat.value ? 'selected' : ''}>
                                            ${cat.label}
                                        </option>`
                                    ).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>URL Gambar Sampul</label>
                                <input type="url" id="editBookCover" value="${book.cover || ''}" placeholder="https://...">
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Deskripsi</label>
                            <textarea id="editBookDesc" rows="3" required>${book.description}</textarea>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>Harga</label>
                                <input type="number" id="editBookPrice" value="${book.price}" step="0.01" required>
                            </div>
                            <div class="form-group">
                                <label>Tanggal Rilis</label>
                                <input type="date" id="editBookReleaseDate" value="${book.releaseDate ? book.releaseDate.substring(0, 10) : ''}" required>
                            </div>
                        </div>

                        <button type="submit" class="btn-save">Simpan Perubahan</button>
                    </form>
                </div>
            </div>
        `;
        
        this.attachEditBookEvent();
        document.body.style.overflow = 'hidden';
    },
    
    // Close edit modal
    closeEditModal: function() {
        const modal = document.getElementById('editBookModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    },
    
    // Attach edit book event
    attachEditBookEvent: function() {
        const form = document.getElementById('editBookForm');
        if (!form) return;
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const bookId = parseInt(document.getElementById('editBookId').value);
            
            const updatedBook = {
                title: document.getElementById('editBookTitle').value,
                author: document.getElementById('editBookAuthor').value,
                category: document.getElementById('editBookCategory').value,
                cover: document.getElementById('editBookCover').value,
                description: document.getElementById('editBookDesc').value,
                price: document.getElementById('editBookPrice').value,
                releaseDate: document.getElementById('editBookReleaseDate').value,
                isNew: document.getElementById('editBookReleaseDate').value.startsWith('2025')
            };
            
            await Storage.updateBook(bookId, updatedBook);
            
            // Refresh data
            window.appState.booksData = await Storage.getBooks();
            
            Books.render();
            Admin.updateStats();
            Admin.closeEditModal();
            Toast.show('Buku berhasil diperbarui!');
        });
    }
};