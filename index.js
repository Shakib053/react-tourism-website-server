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
        app.get('/orders', async (req, res) => {
            console.log('service is hit', req.body);
            const cursor = orderCollection.find({});
            const orders = await cursor.toArray();
            res.send(orders);
        })



        // GET API
        app.get('/destinations/:_id', async (req, res) => {
            const id = req.params._id;
            console.log('getting specific id no ', id);
            const query = { _id: ObjectId(id) };
            const destination = await destinationsCollection.findOne(query);
            res.json(destination);
        })
        //DELETE API

        app.delete('/orders/:_id', async (req, res) => {
            const id = req.params._id;
            const query = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(query);
            res.json(result);
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

            const newUser = req.body;
            const result = await orderCollection.insertOne(newUser);
            console.log('got new user', req.body);
            console.log('added user', result);
            res.json(result);

        })

        app.put('/orders/:_id', async (req, res) => {
            const id = req.params._id;
            const updatedUser = req.body;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: {
                    status: 'Approved',

                },
            };
            const result = await orderCollection.updateOne(filter, updateDoc)
            console.log('updating', id)
            res.json(result)
        })

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