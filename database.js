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
	
	/*var workSchema = new mongoose.Schema({
     firstName: String, // worker first name
     lastName: String, // woker last name
     email:String, // worker email
     password:String, // worker password *need to build proper authentication*
     number: String, // worker's phone number
     currStart: Date, // workers start for current session
     currEnd: Date, // workers end time tof current session
     hours:Number, // total hours
     zip:String, // workers zip
     pay:Number, // workers pay
     open:Boolean, // true if worker is currently in a job
     active:Boolean,
     savedNums:[], // frequent contacts number for clients
     session:[{}], // sessions worked
     history:[{}]
   });*/
   
    /*  var jobSchema = new mongoose.Schema({
       subject: String, // the title of the job ie "yard work for darren"
       pay: Number, // constant hourly payment
       number: String, // clients phone number
       open:Boolean, // if the job is still open for work
       inProgress:Boolean, // if the job is currently being worked on
       accepted: Boolean, // if the job satisfies the amount of workers needed to accept the job
       charged:Boolean,
       workerCount:Number, // how many workers are needed on the job
       workersAccepted:Number, // how many workers accepted
       description:String, // description of the job
       hours: Number, // hours estimated to completed the job
       hoursRequired:Number,
       projectedPay: Number, // projected pay for the job
       totalPay: Number, // total amount paid
       firstName:String, // first name of client
       lastName:String, // last name of client
       email:String, // email of client
       address:String, // client's address
       city:String, // client's city
       zip:String, // client's zipcode
       paid:Boolean,
       todooliePay:Number,
       completed:Boolean, //When the job is completed - true
       jobType:String, // what type of job is it
       date:Date, // date of when the job needs to be completed
       startTime:String, // time of when the job should start
       workerAcceptedList:[{}], // list of workers who accepted the job
       workerList:[{}],
       checkoutList:[{}]
      });*/
 
    // compile schema to model
    var Student = mongoose.model('student', StudentSchema, 'student');
 
    // a document instance
    var students = [
        {
        first: 'noura',
		last: 'b',
		hoursWorked: '2',
		points: '2'
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


