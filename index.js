const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://kiranjoshi:v51n8BEu1PwchVVc@cluster0.xtnuwk8.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run(){
    try{
        const database = client.db('sample_dashboard');
        const dash = database.collection('dash_data');

        const query = {ids: 1};
        const data = await dash.findOne(query);

        console.log(data.projects);
    }finally{
        await client.close();
    }
}

run().catch(console.dir);