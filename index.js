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

app.post('/registration', async (req, res) => {
    const dash = database.collection('users');

    const query = {email: req.body.email};
    const result = await dash.findOne(query);
    
    if(result){return res.json("User exist, try with another email.")}
    
    const document = {username:req.body.username, email:req.body.email, password:req.body.password};
    const data = await dash.insertOne(document);
    return res.json("Success");
})

app.post('/login', async (req, res) => {
    const dash = database.collection('users');

    const query = {email: req.body.email, password: req.body.password};
    const result = await dash.findOne(query);
    
    if(result){return res.json({status:true, username:result.username, email:result.email})}
    
    return res.json({status:false, message:"Login failed"});
})

app.get("/test", (req, res) => {
    res.json("success");
})

app.listen(8800, async ()=>{
    console.log("backend connected")
})
