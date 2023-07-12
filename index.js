const express = require('express')
var cors = require('cors')
var app = express()
const port = 5000

app.use(cors())
app.use(express.json())





const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


async function run() {
    try {
        const uri = "mongodb+srv://rafia:Ym2WLtiVKtuJb3Mz@cluster0.uidcysm.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });


        const catagoriesCollection = client.db("SRbnbHotel").collection("catagories")
        const hotelsCollection = client.db("SRbnbHotel").collection("hotels")
        const reserveCollection = client.db("SRbnbHotel").collection("reserves")
        const bookingCollection = client.db('SRbnbHotel').collection('bookings')


        // app.get("/search", async(req, res)=>{
        //     const {country, guest, rate}= req.query
       
        

        //     const filter = {
        //         "pleace.country" : country,
        //         "room.guest": rate

        //     }

        //     const result = await hotelsCollection.find(filter).toArray()
        //     res.send(result)
            
        // })



          app.post('/booking', async(req, res) =>{
            const book = req.body     
            const result = await bookingCollection.insertOne(book)  
            res.send(result)
        })

     





        app.get('/reserve', async(req, res)=>{
            const email = req.query.email 
    
            const filter = {email: email}
            const result = await reserveCollection.find(filter).toArray()
            res.send(result)
        })



        app.post('/reserve', async(req, res)=>{
            const info = req.body 
            const result = await reserveCollection.insertOne(info)
            res.send(result)
        })



        app.get("/catagories", async (req, res) => {
            const result = await catagoriesCollection.find({}).toArray()
            res.send(result)
        })



        app.get("/hotels/:id", async (req, res) => {
            const id = req.params.id
            const filter = { catagory: id }
            const result = await hotelsCollection.find(filter).toArray()
            res.send(result)
        })


        app.get("/hotel/:id", async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const result = await hotelsCollection.findOne(filter)
            res.send(result)
        })


        app.get("/hotels", async (req, res) => {
            const result = await hotelsCollection.find({}).toArray()
            res.send(result)
        })




        

        

    } finally {


    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})