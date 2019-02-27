const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://admin:admin@server1:27017,server2:27017,server3:27017/crud-nodejs?ssl=true&replicaSet=example-shard-0&authSource=admin";
const app = express();



app.use(bodyParser.urlencoded({ extended:true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
})
app.post('/show', (req, res) => {
    db.collection('data').save(req.body, (err, result) =>{
        if(err) return console.log(err);
    })

    console.log('Saved in BD');
    res.redirect('/');
})

MongoClient.connect(uri, (err, client) =>{
    if (err) return console.log(err);
    db = client.db('crud-nodejs')

    app.listen(3000, () =>{
        console.log('server running on port 3000');
    })
})