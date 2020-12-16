const express = require('express');
const MongoUtil = require('./MongoUtil.js')
const ObjectId = require('mongodb').ObjectId;
const hbs = require('hbs')
const wax = require('wax-on')

require('dotenv').config();

const app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

var helpers = require("handlebars-helpers")({
    handlebars: hbs.handlebars
});

async function main(){

const MONGO_URL = process.env.MONGO_URL;
await MongoUtil.connect(MONGO_URL,'storage_war');
let db= MongoUtil.getDB();

app.get('/', async (req,res) => {
    let hall_of_fame = await db.collection('hall_of_fame').find().toArray();
    res.render('hall_fame', {
        'hall_fame' : hall_of_fame
    })
})
}

main();

app.listen(3000, () => {
    console.log("Express is running")
})



