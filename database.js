//Set up mongoose connection
var mongoose = require('mongoose');

var url = 'mongodb://root:password1234@ds157762.mlab.com:57762/mydb';

mongoose.connect(url);
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
    
    // define Schema
    var StudentSchema = mongoose.Schema({
      first: String,
      last: String,
      hoursWorked: Number,
      points: Number
    });
 
    // compile schema to model
    var Student = mongoose.model('student', StudentSchema, 'student');
 
    // a document instance
    var students = [
        {
        first: 'Pam',
        last: 'Anderson',
        hoursWorked: '2',
        points: '2'
        },
        {
        first: 'Bruce',
        last: 'Wayne',
        hoursWorked: '1',
        points: '1'
        }
    ];
 
    // save multiple documents to the collection referenced by Book Model
    Student.collection.insert(students, function (err, docs) {
        if (err){ 
            return console.error(err);
        } else {
          console.log("Multiple documents inserted to Collection");
        }
      });
    
});


