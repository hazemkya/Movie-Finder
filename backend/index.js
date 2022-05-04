import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import MoviesDAO from "./dao/movies.dao.js"
dotenv.config();

const client = mongodb.MongoClient;

const port = process.env.PORT || 8000

client.connect(
    process.env.ATLAS_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)    
})
.then(async client => {
    await MoviesDAO.injectDB(client)
    app.listen(port, ()=> {
        console.log(`Listinning on port ${port}`)
    })
})