const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('BAse de datos Online')
    } catch (error) {
        throw new Error('ERRor de base de datos')
    }
}

module.exports = {
    dbConnection
}