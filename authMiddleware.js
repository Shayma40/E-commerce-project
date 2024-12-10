const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    console.log('Authorization header:', authHeader);

    // Check if the header is present and properly formatted
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Authorization header missing or improperly formatted');
      return res.status(401).json({ message: 'Authorization header missing or improperly formatted' });
    }

    // Extract the token after 'Bearer '
    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token);
    
    if (!token) {
      console.error('No token provided');
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.error('Token validation error:', err);
        return res.status(401).json({ message: 'Invalid token' });
      }
      const user = await User.findById(decoded.id);

      // Attach the decoded user object to req.user
      req.user = { id: decoded.id, isAdmin: decoded.isAdmin, email: user?.email };
      console.log('Decoded user:', decoded);
      next();
    });
  } catch (err) {
    console.error('Authorization error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = authMiddleware;
