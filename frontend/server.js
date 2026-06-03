const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/config.js', (req, res) => {
    // Utilise le DNS interne d'OpenShift vers le service "backend"
    const apiUrl = process.env.BACKEND_URL || 'http://backend:8080';
    res.setHeader('Content-Type', 'application/javascript');
    res.send(`window.BACKEND_URL = "${apiUrl}";`);
});

app.listen(port, () => console.log(`Frontend sur le port ${port}`));
