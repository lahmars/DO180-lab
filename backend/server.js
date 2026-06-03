const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Se connecte au nom DNS généré automatiquement par le devfile
const mongoUrl = process.env.MONGO_URL || 'mongodb://root:mymongopassword@mymongo-mongodb:27017';
const dbName = process.env.MONGO_DB || 'admin';
let db, todoCollection;

MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
    .then(client => {
        console.log('=> Connecté à MongoDB !');
        db = client.db(dbName);
        todoCollection = db.collection('tasks');
    })
    .catch(error => console.error('! Erreur MongoDB:', error));

app.get('/api/todos', async (req, res) => {
    try {
        const todos = await todoCollection.find().toArray();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

app.post('/api/todos', async (req, res) => {
    try {
        const newTodo = { text: req.body.text, createdAt: new Date() };
        await todoCollection.insertOne(newTodo);
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

app.get('/health', (req, res) => res.send('OK'));

app.listen(port, () => console.log(`Backend sur le port ${port}`));
