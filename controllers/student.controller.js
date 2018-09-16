const Student = require('../models/student.model.js');

// Create and Save a new Student
exports.create = (req, res) => {
    if(!req.body.first | !req.body.last) {
        return res.status(400).send({
            message: "Name content can not be empty"
        });
    }
            // Create a Student
    const student = new Student({
        first: req.body.first,
        last: req.body.last,
        hoursWorked: req.body.hoursWorked,
        points: req.body.points
    });

    // Save Student in the database
    student.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Student.find().then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error while retrieving students"
        });
    });

};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Student.findById(req.params.studentId).then(student=>{
        if(!student){
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectID'){
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });
        }
        return res.status(500).send({
            message: "error retrieving student with id " + req.params.studentId 
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
        // Validate Request
        if(!req.body.first | !req.body.last) {
            return res.status(400).send({
                message: "Name content can not be empty"
            });
        }
    
        // Find note and update it with the request body
       Student.findByIdAndUpdate(req.params.studentId, {
            first: req.body.first,
            last: req.body.last,
            hoursWorked: req.body.hoursWorked,
            points: req.body.points
        }, {new: true}) //The {new: true} option in the findByIdAndUpdate() method is used to return the modified document to the then() function instead of the original.
        .then(student => {
            if(!student) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.studentId
                });
            }
            res.send(student);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.studentId
                });                
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.studentId
            });
        });

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.studentId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.studentId
        });
    });

};