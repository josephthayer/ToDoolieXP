module.exports = (app) => {
    const students = require('../controllers/student.controller.js');

    // Create a new student
    app.post('/student', students.create);

    // Retrieve all students
    app.get('/students', students.findAll);

    // Retrieve a single student with studentid
    app.get('/students/:studentId', students.findOne);

    // Update a Note with studentid
    app.put('/students/:studentId', students.update);

    // Delete a Note with studentid
    app.delete('/students/:studentId', students.delete);
}