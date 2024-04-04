const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Use an environment variable for this in production

function authenticateToken(req, res, next) {
 const token = req.header('Authorization');
 if (!token) return res.status(401).json({ error: 'Authentication failed' });

 jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token is not valid' });
    req.user = user;
    next();
 });
}

module.exports = authenticateToken;