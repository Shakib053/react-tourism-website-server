const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');

//import dotenv config
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e9ghj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

async function run() {
    try {
        await client.connect();

        const database = client.db('travelBooking');
        const destinationsCollection = database.collection('destinations');
        const orderCollection = database.collection('orders');


        // GET API
        app.get('/destinations', async (req, res) => {
            console.log('service is hit', req.body);
            const cursor = destinationsCollection.find({});
            const destinations = await cursor.toArray();
            res.send(destinations);
        })



        // GET API
        app.get('/destinations/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting specific id no ', id);
            const query = { _id: ObjectId(id) };
            const destination = await destinationsCollection.findOne(query);
            res.json(destination);
        })


        // POST API
        app.post('/destinations', async (req, res) => {
            const newUser = req.body;
            const result = await destinationsCollection.insertOne(newUser);
            console.log('got new user', req.body);
            console.log('added user', result);
            res.json(result);
        });


        // Add Orders API
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.json(result);
        })

        // // Query for a movie that has the title 'The Room'

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