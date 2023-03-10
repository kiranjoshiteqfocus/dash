const { MongoClient } = require("mongodb");
const  express = require("express");
const cors = require("cors");

const uri = "mongodb+srv://kiranjoshi:v51n8BEu1PwchVVc@cluster0.xtnuwk8.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const app = express();
app.use(express.json());
app.use(cors());

const database = client.db('sample_dashboard');

app.get('/projectcards', async (req, res) => {
    const dash = database.collection('dash_data');
    const query = {ids: 1};
    const data = await dash.findOne(query);
    return res.json(data);
})

app.listen(8800, async ()=>{
    console.log("backend connected")
})
