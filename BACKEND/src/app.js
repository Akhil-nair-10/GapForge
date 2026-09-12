const express = require('express');
const dns = require('dns');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://gapforge.onrender.com'
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

/* Requiring the routes here */
const authRoutes = require('../src/routes/auth.routes');
const aiRoutes = require('../src/routes/ai.routes');

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);

app.use(express.json());
app.use(cookieParser());

// simple backend testing
app.get('/', (req, res) => {
    res.send('Backend is running');
});

/* using those routes here */
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

module.exports = app;