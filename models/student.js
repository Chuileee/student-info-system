let mongoose = require('mongoose');

//Create Model of Studentt
let studentModel = mongoose.Schema(
    {
        "name" : String,
        "age" : Number,
        "major" : String,
        "createdDate": { type: Date, default: Date.now },
        "updatedDate": { type: Date, default: Date.now }
    },
    {
        collection: "student",
        timestamps: { 
            createdAt: 'createdDate',
            updatedAt: 'updatedDate'
        }
    }
);

module.exports = mongoose.model('Student', studentModel);
