const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./models')
const routes = require('./routes/routes')
dotenv.config();

const app = express();
// connectionDB()
app.use(express.json());
app.use(cors());
app.get("/",(req,res) => res.send("Hello , Welcome "))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(`/api`, routes.routes);

const ports = process.env.PORT || 3000
db.sequelize.sync().then(()=>{
    app.listen(process.env.PORT , () => console.log("App Listening on url http://localhost:" + ports));
})

