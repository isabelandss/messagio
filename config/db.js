const mongoose = require('mongoose');

mongoose.connect('mongodb://isatheus:isatheus@ds141796.mlab.com:41796/messagio', { 
    useMongoClient: true 
})
