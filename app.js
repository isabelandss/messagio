const   express     = require('express'),
        bodyParser  = require('body-parser')

require('./config/db');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('./src/routes/index.routes')(app);

app.listen(port, () => {
    console.log(`Estamos rodando na porta ${port}`);
})