const  express =  require('express');

const router = express.Router();


const {storedata , fetchrecords} = require('../controller/app')

// Routes for fetching and storing data
router.route('/store').get(storedata);   
router.route('/fetchdata').get(fetchrecords); 


module.exports = router; 