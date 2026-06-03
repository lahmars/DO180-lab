const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Servir les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Permet de passer l'URL de l'API au client de manière dynamique
app.get('/config.js', (req, res) => {
    const apiUrl = process.env.BACKEND_URL || 'http://localhost:8080';
    res.setHeader('Content-Type', 'application/javascript');
    res.send(`window.BACKEND_URL = "${apiUrl}";`);
});

app.listen(port, () => {
    console.log(`Frontend actif sur le port ${port}`);
});
