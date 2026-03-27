/**
 * API Health Check
 * Mendeteksi apakah Backend Node.js di Vercel sudah aktif.
 */
export default function handler(req, res) {
  res.status(200).json({
    status: 'success',
    message: 'Backend Bukuku sudah aktif!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
}
