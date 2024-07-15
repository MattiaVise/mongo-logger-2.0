const mongoose = require("mongoose")

const connection = (uri) => {
    mongoose.connect(uri)
}

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${uri}`);
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

module.exports = {mongoose, connection}

