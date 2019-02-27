const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
})
app.post('/show', (req, res) => {
    console.log(req.body);
})

app.listen(3000, () => {
    console.log('server running on port 3000');
})