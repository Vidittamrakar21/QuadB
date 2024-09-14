
const axios = require('axios');

const Data = require('../model/app')



const storedata = async (req,res)=>{

    try {

        //fetching the data  from the provided API.
        
        const data  = await (await axios.get('https://api.wazirx.com/api/v2/tickers')).data;

        //filtering top 10 records from the dataset according to given schema.

        const recordsArray = Object.values(data);

        const newdata = recordsArray.slice(0, 10);

        const filteredData = newdata.map(item => {
            return {
                name: item.name,
                last: item.last,
                buy: item.buy,
                sell: item.sell,
                volume: item.volume,
                base_unit: item.base_unit
            };
        });




        //Storing records in the MongoDb Database.
       
        const records = await Data.find();

        if(records.length === 10){
            res.json({message: "records are stored in the database"});
        }
        else{

            const storeddata = await Data.insertMany(filteredData);

            res.json({data: storeddata});
        }



        
        
    } catch (error) {
        res.json(error)
    }
}


const fetchrecords = async (req,res)=>{
    try {

        //Fetching records from the Database.
        const records = await Data.find();
        res.json({data: records});


        
    } catch (error) {
        res.json(error)
    }
}



module.exports = {storedata , fetchrecords}; 