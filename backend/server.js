const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Configuration MongoDB via variables d'environnement
const mongoUrl = process.env.MONGO_URL || 'mongodb://root:secret@mongodb:27017';
const dbName = process.env.MONGO_DB || 'demodb';
let db, todoCollection;

// Connexion à la base de données
MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
    .then(client => {
        console.log('=> Connecté avec succès à MongoDB');
        db = client.db(dbName);
        todoCollection = db.collection('todos');
    })
    .catch(error => console.error('! Erreur de connexion MongoDB:', error));

// API : Récupérer les tâches
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await todoCollection.find().toArray();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

// API : Ajouter une tâche
app.post('/api/todos', async (req, res) => {
    try {
        const newTodo = { text: req.body.text, createdAt: new Date() };
        await todoCollection.insertOne(newTodo);
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

// Route de Health Check (Bonne pratique OpenShift)
app.get('/health', (req, res) => res.send('OK'));

app.listen(port, () => {
    console.log(`Backend actif sur le port ${port}`);
});
