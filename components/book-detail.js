// ========== BOOK DETAIL COMPONENT ==========

const BookDetail = {
    // Open book detail modal
    open: function(bookId) {
        const book = Storage.getBookById(bookId);
        if (!book) return;
        
        const container = document.getElementById('book-detail-modal-container');
        if (!container) return;
        
        const isNew = book.releaseDate === '2025' || book.isNew;
        const newBadge = isNew ? '<span class="new-book-badge" style="margin-left: 1rem;">Baru Rilis!</span>' : '';
        
        const coverHtml = book.cover 
            ? `<img src="${book.cover}" alt="${book.title}" class="book-detail-cover-img">`
            : `<div class="no-cover">📚</div>`;
        
        container.innerHTML = `
            <div id="bookDetailModal" class="modal" style="display: block;">
                <div class="modal-content modal-large">
                    <div class="modal-header">
                        <h2 style="color: #4a3b2c; margin: 0; font-size: 1.5rem;">📖 Detail Buku</h2>
                        <span class="close" onclick="BookDetail.close()">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="book-detail-container">
                            <div class="book-detail-cover">
                                ${coverHtml}
                            </div>
                            <div class="book-detail-info">
                                <div class="book-detail-category">
                                    ${book.category.replace('-', ' ')} ${newBadge}
                                </div>
                                <h1 class="book-detail-title">${book.title}</h1>
                                <div class="book-detail-author">
                                    <i class="fas fa-pencil-alt"></i> ${book.author}
                                </div>
                                
                                <div class="book-detail-meta">
                                    <span class="book-detail-price">${book.price}</span>
                                    <span class="book-detail-date">
                                        <i class="fas fa-calendar-alt"></i> ${book.releaseDate}
                                    </span>
                                </div>
                                
                                <div class="book-detail-desc">
                                    <h3>📝 Deskripsi Buku</h3>
                                    <p>${book.description}</p>
                                </div>
                                
                                <div class="book-detail-specs">
                                    <h3><i class="fas fa-info-circle"></i> Informasi Detail</h3>
                                    <div class="specs-grid">
                                        <div class="spec-item">
                                            <span class="spec-label">Penerbit</span>
                                            <span class="spec-value">${book.publisher || 'Gramedia'}</span>
                                        </div>
                                        <div class="spec-item">
                                            <span class="spec-label">Jumlah Halaman</span>
                                            <span class="spec-value">${book.pages || '256'} halaman</span>
                                        </div>
                                        <div class="spec-item">
                                            <span class="spec-label">Bahasa</span>
                                            <span class="spec-value">${book.language || 'Indonesia'}</span>
                                        </div>
                                        <div class="spec-item">
                                            <span class="spec-label">ISBN</span>
                                            <span class="spec-value">${book.isbn || '978-602-1234-56-7'}</span>
                                        </div>
                                        <div class="spec-item">
                                            <span class="spec-label">Kategori</span>
                                            <span class="spec-value">${book.category.replace('-', ' ')}</span>
                                        </div>
                                        <div class="spec-item">
                                            <span class="spec-label">Status</span>
                                            <span class="spec-value" style="color: ${isNew ? '#c17b4c' : '#6b4f3a'}; font-weight: 700;">
                                                ${isNew ? 'Baru Rilis' : 'Tersedia'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="book-detail-actions">
                                    <button class="btn-detail-close" onclick="BookDetail.close()">
                                        <i class="fas fa-times"></i> Tutup
                                    </button>
                                    ${window.appState.currentUser?.role === 'admin' ? `
                                        <button class="btn-detail-edit" onclick="Admin.openEditModal(${book.id}); BookDetail.close();">
                                            <i class="fas fa-edit"></i> Edit Buku
                                        </button>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.style.overflow = 'hidden';
    },
    
    // Close book detail modal
    close: function() {
        const modal = document.getElementById('bookDetailModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
};