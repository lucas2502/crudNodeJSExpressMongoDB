const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-rx5e2.mongodb.net/crud-nodejs?retryWrites=true";

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err);
    db = client.db('crud-nodejs');

    app.listen(3000, () => {
        console.log('server running on port 3000');
    })
})


app.use(bodyParser.urlencoded({ extended:true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/', (req, res) => {
    const cursor = db.collection('data').find();
})

//insert in bd
app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if(err) return console.log(err);
        res.render('show.ejs', { data: results });
    })
})

app.post('/show', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if(err) return console.log(err);

        console.log('Saved in BD');
        res.redirect('/show');
    })
})

app.route('/edit/:id')
.get((req, res) => {
    var id = req.params.id
    

    db.collection('data').find(ObjectId(id)).toArray((err, result) => {
        if(err) return res.send(err)
        res.render('edit.ejs', { data: result })
    })
})
.post((req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var surname = req.body.surname;
    db.collection('data').updateOne({_id: ObjectId(id)}, {
        $set: {
            name,
            surname
        }
    }, (err, result) => {
        if(err) return res.send(err)
        res.redirect('/show');
        console.log('Atualizado no banco de Dados');
    })
})