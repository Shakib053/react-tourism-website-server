const express = require('express');
const { MongoClient } = require('mongodb');

//import dotenv config
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e9ghj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('database in connected..eita hoilo checking')
        // const database = client.db("sample_mflix");
        // const movies = database.collection("movies");
        // // Query for a movie that has the title 'The Room'
        // const query = { title: "The Room" };

        // const movie = await movies.findOne(query, options);
        // // since this method returns the matched document, not a cursor, print it directly
        // console.log(movie);
    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!hi hi hibh  hbvue b thus is the server')
})

app.listen(port, () => {
    console.log(`example : tourism service website is listening at http://localhost:${port}`)
})