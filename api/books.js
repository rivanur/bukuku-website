import pool from './db.js';

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        // Ambil semua buku dari database
        const [rows] = await pool.query('SELECT * FROM books ORDER BY createdAt DESC');
        res.status(200).json(rows);
        break;

      case 'POST':
        // Tambah buku baru
        const { title, author, category, description, price, releaseDate, cover, isNew } = req.body;
        const [insertResult] = await pool.query(
          'INSERT INTO books (title, author, category, description, price, releaseDate, cover, isNew) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [title, author, category, description, price, releaseDate, cover, isNew]
        );
        res.status(201).json({ id: insertResult.insertId, message: 'Buku berhasil ditambahkan!' });
        break;

      case 'PUT':
        // Update buku
        const { id } = req.query;
        const updateData = req.body;
        const [updateResult] = await pool.query(
          'UPDATE books SET title=?, author=?, category=?, description=?, price=?, releaseDate=?, cover=?, isNew=? WHERE id=?',
          [updateData.title, updateData.author, updateData.category, updateData.description, updateData.price, updateData.releaseDate, updateData.cover, updateData.isNew, id]
        );
        res.status(200).json({ message: 'Buku berhasil diperbarui!' });
        break;

      case 'DELETE':
        // Hapus buku
        const deleteId = req.query.id;
        await pool.query('DELETE FROM books WHERE id = ?', [deleteId]);
        res.status(200).json({ message: 'Buku berhasil dihapus!' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal memproses data buku', details: error.message });
  }
}
