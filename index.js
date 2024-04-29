const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware//
app.use(cors())
app.use(express.json());
// torisum
//DcDk9q4a2QQnrEAv


// const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.texsw4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.texsw4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const toursimCollection = client.db( 'tourismdb').collection('tourism')
     app.get('/torisum',async(req,res)=>{
      const cursor = toursimCollection.find();
      const result = await cursor.toArray();
      res.send(result);
     }) 
     app.get("/torisum/:email",async(req,res)=>{
      console.log(req.params.email);
      const result = await toursimCollection.find({email:req.params.email}).toArray();
      res.send(result)
     })
     app.delete('/torisum/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await toursimCollection.deleteOne(query)
      res.send(result)
    })
    app.post('/torisum',async(req,res)=>{
      const newTorist = req.body;
      console.log(newTorist);
      const result = await  toursimCollection.insertOne(newTorist);
      res.send(result);

    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res) => {
   res.send('Tourism server is running ')
}) 

app.listen(port,() =>{
     console.log(`Tourism server is running on port:${port}`)
})

