let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to model
let Student = require('../models/student');

//Manage routes
router.get('/', (req, res, next) => {
    Student.find((err, studentList) => {
        if(err){
            return console.error(err);
        }else{
            //console.log(studentList);
            res.render('student/list', {title: 'Student Info', StudentList: studentList})
        }
    });
});

// to open add student page
router.get('/add', (req, res, next) => {
    res.render('student/add', {title: 'Add Student'})
});

// insert student data into mongoDB collection
router.post('/add', (req, res, next) => {
    //getting data from form
    let newStudent = Student({
        "name": req.body.sname,
        "age": req.body.sage,
        "major": req.body.smajor,
        "createdDate": Date.now(),
        "updatedDate": Date.now()
    });

    //insert data into the mongoDB
    Student.create(newStudent, (err, Student) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/students')
        }
    });
});

//Retrieve data from MongoDB and Open it in view (FORM)
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    Student.findById(id, (err, studentToEdit) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            //write code to display data in view
            res.render('student/edit', { title : 'Edit Stedent', student: studentToEdit})
        }
    });
});

//write code to store updated data into MongoDB
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updatedStudent = Student({
        "_id": id,
        "name": req.body.sname,
        "age": req.body.sage,
        "major": req.body.smajor,
        "updatedDate": Date.now()
    });

/*     Student.updateOne({_id: id}, updatedStudent, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/students');
        }
    }); */
    Student.findByIdAndUpdate(id, updatedStudent, { new: true }, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/students');
        }
    });
    

});

//to delete documents from the collection
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    Student.remove({_id: id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/students');
        }
    });
});

module.exports = router;