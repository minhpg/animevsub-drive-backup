var mysql = require('mysql');
require('dotenv').config()
const mongoose = require('mongoose')
const fileSchema = require('../src/models/file')

const initConnection = (callback) => {
    mongoose.connect(process.env.MONGO_DB || 'mongodb://127.0.0.1/drive-backup');
    var db = mongoose.connection;
    db.on('error', function (err) {
      console.log('Failed to connect to database');
      process.exit(1);
    });
  
    db.once('open', function () {
      console.log("Connected to database");
      callback();
    });
  };

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '04082004',
    database: 'drive'
});

connection.connect();

initConnection(() => {
    connection.query('SELECT * FROM DriveFiles', async (error, results) => {
        if (error) throw error;
        for (result of results) {
            try {
                const new_file = new fileSchema({
                    origin: result.file.split('.')[1],
                    dest: result.driveId
                })
                await new_file.save()
            }
            catch(err) {
                console.log(err.message)
            }
    
        }
        mongoose.disconnect()
        connection.end();
    });

})

