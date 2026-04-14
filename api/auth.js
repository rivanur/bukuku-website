import pool from './db.js';

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        // Ambil semua user (Hanya untuk Admin di sisi frontend)
        const [users] = await pool.query('SELECT id, fullname, username, role, createdAt FROM users');
        res.status(200).json(users);
        break;

      case 'POST':
        const { action, username, password, fullname, role } = req.body;

        if (action === 'register') {
          // Cek apakah username sudah ada
          const [existing] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
          if (existing.length > 0) {
            return res.status(400).json({ error: 'Username sudah digunakan' });
          }

          // Tambah user baru (NOTE: Di dunia nyata, gunakan bcrypt untuk password!)
          await pool.query(
            'INSERT INTO users (fullname, username, password, role) VALUES (?, ?, ?, ?)',
            [fullname, username, password, role || 'user']
          );
          return res.status(201).json({ message: 'Registrasi berhasil!' });
        } 
        
        else if (action === 'login') {
          // Cari user berdasarkan username & password
          const [users] = await pool.query(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [username, password]
          );

          if (users.length === 0) {
            return res.status(401).json({ error: 'Username atau password salah' });
          }

          const user = users[0];
          delete user.password; // Jangan kirim password ke frontend
          return res.status(200).json({ status: 'success', user });
        }

        res.status(400).json({ error: 'Aksi tidak valid' });
        break;

      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan sistem', details: error.message });
  }
}
