const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Use an environment variable for this in production

async function loginUser(req, res) {
 try {
    const { username, password } = req.body;
    // Your logic to validate the user credentials
    // If valid, generate a token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    res.json({ token });
 } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
 }
}

module.exports = { loginUser }