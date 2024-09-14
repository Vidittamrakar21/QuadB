const  express =  require('express');
const cors =  require('cors');
const morgan =  require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();




const apiroute =  require('./routes/app.js')

//connecting Mongodb with the server
main().catch(err => console.log(err));

async function main() {
await mongoose.connect(`mongodb+srv://vidit:${process.env.dbpass}@cluster0.q97l8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
console.log("Database Connected");
}


async function init (){

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(morgan('tiny'));


//entry point

app.get('/', (req,res)=>{
    try {
        
        res.json({message: " Server is running !"})
    } catch (error) {
        res.json(error)
    }
})



app.use('/api', apiroute);



app.listen(8080, ()=>{

    

    console.log("server started on port 8080")
})
}

init();