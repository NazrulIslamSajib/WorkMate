// backend/routes/logout.js
const express = require('express');
const router = express.Router();

// If using sessions, destroy session. If stateless, just respond OK.
router.post('/', (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logged out' });
    });
  } else {
    res.status(200).json({ message: 'Logged out' });
  }
});

module.exports = router;
