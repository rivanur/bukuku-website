// ========== BOOKS COMPONENT - FIXED GRID ==========

const Books = {
    // Render books grid
    render: function() {
        const container = document.getElementById('books-container');
        if (!container) return;
        
        const filteredBooks = this.filterAndSort();
        const totalBooks = filteredBooks.length;
        const totalPages = Math.ceil(totalBooks / window.appState.itemsPerPage);
        
        if (window.appState.currentPage > totalPages && totalPages > 0) {
            window.appState.currentPage = totalPages;
        }
        
        const startIndex = (window.appState.currentPage - 1) * window.appState.itemsPerPage;
        const paginatedBooks = filteredBooks.slice(startIndex, startIndex + window.appState.itemsPerPage);
        
        // Update books count
        this.updateBooksCount(paginatedBooks.length, totalBooks);
        
        // Get books grid element
        const booksGrid = document.getElementById('booksGrid');
        if (!booksGrid) return;
        
        // Render books
        if (paginatedBooks.length === 0) {
            booksGrid.innerHTML = this.getEmptyStateHTML();
        } else {
            booksGrid.innerHTML = this.getBooksGridHTML(paginatedBooks);
        }
        
        // Render pagination
        this.renderPagination(totalPages);
    },
    
    // Filter and sort books
    filterAndSort: function() {
        let filtered = [...Storage.getBooks()];
        
        // Filter new books
        if (window.appState.showingNewBooksOnly || window.appState.currentMenu === 'newbooks') {
            filtered = filtered.filter(book => book.releaseDate === '2025' || book.isNew === true);
            window.appState.showingNewBooksOnly = false;
        }
        
        // Filter by category
        if (window.appState.currentCategory !== 'all') {
            filtered = filtered.filter(book => book.category === window.appState.currentCategory);
        }
        
        // Filter by search
        if (window.appState.searchTerm) {
            const term = window.appState.searchTerm.toLowerCase();
            filtered = filtered.filter(book => 
                book.title.toLowerCase().includes(term) || 
                book.author.toLowerCase().includes(term)
            );
        }
        
        // Sort
        switch (window.appState.currentSort) {
            case 'newest':
                filtered.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
                break;
            case 'oldest':
                filtered.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
                break;
            case 'title-asc':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                filtered.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'price-low':
                filtered.sort((a, b) => {
                    const priceA = parseInt(a.price.replace(/\D/g, ''));
                    const priceB = parseInt(b.price.replace(/\D/g, ''));
                    return priceA - priceB;
                });
                break;
            case 'price-high':
                filtered.sort((a, b) => {
                    const priceA = parseInt(a.price.replace(/\D/g, ''));
                    const priceB = parseInt(b.price.replace(/\D/g, ''));
                    return priceB - priceA;
                });
                break;
        }
        
        return filtered;
    },
    
    // Update books count display
    updateBooksCount: function(shown, total) {
        const countElement = document.getElementById('booksCount');
        if (!countElement) return;
        
        if (window.appState.currentMenu === 'newbooks') {
            countElement.innerHTML = `📌 Buku Baru 2025: ${shown} dari ${total} buku`;
        } else {
            countElement.innerHTML = `📚 Menampilkan ${shown} dari ${total} buku`;
        }
    },
    
    // Get empty state HTML
    getEmptyStateHTML: function() {
        return `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <p>Belum ada buku dalam kategori ini</p>
                ${window.appState.currentMenu === 'newbooks' ? 
                    '<p class="suggestion">📅 Belum ada buku baru rilis. Cek lagi nanti!</p>' : ''}
            </div>
        `;
    },
    
    // Get books grid HTML - FIXED CARD SIZE
    getBooksGridHTML: function(books) {
        return books.map(book => {
            // Batasi panjang teks untuk konsistensi
            const desc = book.description.length > 100 
                ? book.description.substring(0, 100) + '...' 
                : book.description;
            
            const author = book.author.length > 25 
                ? book.author.substring(0, 22) + '...' 
                : book.author;
            
            const title = book.title.length > 45 
                ? book.title.substring(0, 42) + '...' 
                : book.title;
            
            return `
            <div class="book-card" onclick="BookDetail.open(${book.id})">
                ${book.cover ? 
                    `<img src="${book.cover}" alt="${book.title}" class="book-cover" loading="lazy">` : 
                    `<div class="no-cover">📚</div>`
                }
                <div class="book-category">
                    <span>${book.category.replace('-', ' ')}</span>
                    ${(book.releaseDate === '2025' || book.isNew) ? 
                        '<span class="new-book-badge">BARU!</span>' : ''}
                </div>
                <div class="book-title">${title}</div>
                <div class="book-author">
                    <i class="fas fa-user"></i> ${author}
                </div>
                <div class="book-desc">${desc}</div>
                <div class="book-meta">
                    <span class="book-price">${book.price}</span>
                    <span class="book-date">
                        <i class="far fa-calendar-alt"></i> ${book.releaseDate}
                    </span>
                </div>
                ${window.appState.currentUser?.role === 'admin' ? `
                    <div class="admin-controls" onclick="event.stopPropagation();">
                        <button class="btn-edit" onclick="Admin.openEditModal(${book.id}); event.stopPropagation();">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-delete" onclick="Books.confirmDelete(${book.id}); event.stopPropagation();">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </div>
                ` : ''}
            </div>
        `}).join('');
    },
    
    // Render pagination
    renderPagination: function(totalPages) {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let html = '';
        
        // Previous button
        html += `<button class="page-btn ${window.appState.currentPage === 1 ? 'disabled' : ''}" 
            ${window.appState.currentPage === 1 ? 'disabled' : ''} onclick="Books.changePage(${window.appState.currentPage - 1})">
            <i class="fas fa-chevron-left"></i>
        </button>`;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || 
                i === totalPages || 
                (i >= window.appState.currentPage - 1 && i <= window.appState.currentPage + 1)
            ) {
                html += `<button class="page-btn ${i === window.appState.currentPage ? 'active' : ''}" 
                    onclick="Books.changePage(${i})">${i}</button>`;
            } else if (i === window.appState.currentPage - 2 || i === window.appState.currentPage + 2) {
                html += `<span class="page-dots">...</span>`;
            }
        }
        
        // Next button
        html += `<button class="page-btn ${window.appState.currentPage === totalPages ? 'disabled' : ''}" 
            ${window.appState.currentPage === totalPages ? 'disabled' : ''} onclick="Books.changePage(${window.appState.currentPage + 1})">
            <i class="fas fa-chevron-right"></i>
        </button>`;
        
        pagination.innerHTML = html;
    },
    
    // Change page
    changePage: function(page) {
        const filteredBooks = this.filterAndSort();
        const totalPages = Math.ceil(filteredBooks.length / window.appState.itemsPerPage);
        
        if (page >= 1 && page <= totalPages) {
            window.appState.currentPage = page;
            this.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    
    // Confirm delete book
    confirmDelete: function(bookId) {
        if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
            this.deleteBook(bookId);
        }
    },
    
    // Delete book
    deleteBook: function(bookId) {
        if (window.appState.currentUser?.role !== 'admin') {
            Toast.show('Anda tidak memiliki akses!', 'error');
            return;
        }
        
        Storage.deleteBook(bookId);
        Toast.show('Buku berhasil dihapus!');
        this.render();
        Admin.updateStats();
    },
    
    // Render filter section
    renderFilterSection: function() {
        const container = document.getElementById('filter-container');
        if (!container) return;
        
        container.innerHTML = `
            <section class="filter-section">
                <div class="filter-header">
                    <h3>📖 Jelajahi Kategori</h3>
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="searchInput" placeholder="Cari judul atau penulis..." autocomplete="off">
                    </div>
                </div>
                <div class="filter-buttons">
                    <button class="filter-btn active" data-category="all">Semua</button>
                    <button class="filter-btn" data-category="fiksi">Fiksi</button>
                    <button class="filter-btn" data-category="nonfiksi">Nonfiksi</button>
                    <button class="filter-btn" data-category="teknologi">Teknologi</button>
                    <button class="filter-btn" data-category="self-improvement">Self Improvement</button>
                    <button class="filter-btn" data-category="sejarah">Sejarah</button>
                    <button class="filter-btn" data-category="bisnis">Bisnis</button>
                </div>
            </section>
        `;
        
        this.attachFilterEvents();
    },
    
    // Render books section
    renderBooksSection: function() {
        const container = document.getElementById('books-container');
        if (!container) return;
        
        container.innerHTML = `
            <section class="books-section">
                <div class="books-header">
                    <p id="booksCount">📚 Menampilkan 0 buku</p>
                    <div class="sort-select">
                        <label for="sortSelect">Urutkan:</label>
                        <select id="sortSelect">
                            <option value="newest">Terbaru</option>
                            <option value="oldest">Terlama</option>
                            <option value="title-asc">Judul A-Z</option>
                            <option value="title-desc">Judul Z-A</option>
                            <option value="price-low">Harga Terendah</option>
                            <option value="price-high">Harga Tertinggi</option>
                        </select>
                    </div>
                </div>
                
                <div class="books-grid" id="booksGrid"></div>
                <div class="pagination" id="pagination"></div>
            </section>
        `;
        
        this.attachSortEvents();
        this.attachSearchEvents();
    },
    
    // Attach filter events
    attachFilterEvents: function() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (!window.appState.currentUser) {
                    Toast.show('🔐 Silakan login terlebih dahulu!', 'warning');
                    Auth.openLoginModal();
                    return;
                }
                
                if (window.appState.currentUser.role === 'admin') {
                    Toast.show('👑 Admin melihat semua buku', 'info');
                    return;
                }
                
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                window.appState.currentCategory = this.dataset.category;
                window.appState.currentPage = 1;
                Books.render();
            });
        });
    },
    
    // Attach sort events
    attachSortEvents: function() {
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', function(e) {
                window.appState.currentSort = e.target.value;
                window.appState.currentPage = 1;
                Books.render();
            });
        }
    },
    
    // Attach search events
    attachSearchEvents: function() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            let timeout;
            searchInput.addEventListener('input', function(e) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    window.appState.searchTerm = e.target.value;
                    window.appState.currentPage = 1;
                    Books.render();
                }, 300);
            });
        }
    }
};

// Initialize books components
document.addEventListener('DOMContentLoaded', function() {
    Books.renderFilterSection();
    Books.renderBooksSection();
});