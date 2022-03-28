const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
const otpGenerator = require('otp-generator');
const request = require('request');

// Validation

// at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidationRegex = /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]$/;

// Mongoose stuff

mongoose.connect('mongodb+srv://admin-rohan:test123@cluster0.g0nhe.mongodb.net/StudentData');

// Schemas

const studentResultSchema = new mongoose.Schema({
    // To be decided.
});

const studentStatusSchema = new mongoose.Schema({
    // To be decided (like the semester details etc.).
});

const trainingDataSchema = new mongoose.Schema({
    certificateLink: {
        type: String,
        required: true,
    },
    trainingOrganization: {
        type: String,
        required: true,
    },
    trainingSummary: {
        type: String,
        required: true,
    },
});

const fellowshipDataSchema = new mongoose.Schema({
    certificateLink: {
        type: String,
        required: true,
    },
    fellowshipOrganization: {
        type: String,
        required: true,
    },
    fellowshipSummary: {
        type: String,
        required: true,
    },
    certificationId: {
        type: String,
        required: true,
    },
});

const grantDataSchema = new mongoose.Schema({
    certificateLink: {
        type: String,
        required: true,
    },
    grantingOrganization: {
        type: String,
        required: true,
    },
    grantAmount: {
        type: Number, required: true
    },
    grantId: {
        type: String,
        required: true,
    },
});

const fellowshipGrantRelationDataSchema = new mongoose.Schema({
    grant: {
        type: String,
        required: true,
    },
    fellowship: {
        type: String,
        required: true,
    },
});

const collegeDataSchema = new mongoose.Schema({
    rollNo: {
        type: String,
        required: true,
    },
    degreeType: {
        type: String,
        required: true,
    },
    collegeAICTEId: {
        type: String,
        required: true,
    },
    degreeSpecialization: {
        type: String,
        required: true,
    },
    successfulCompletion: {
        type: Boolean,
        required: true,
    },
    // result: studentResultSchema,   // This is updatable, unlike we thought previously. We may send a reminder to students periodically.
    // currentStatus: studentStatusSchema,    // This is updatable, unlike we thought previously. We may send a reminder to students periodically.
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
});

const studentSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
        // match: passwordValidationRegex,
        minlength: 8,
        maxlength: 16
    },
    aadharNo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    colleges: [collegeDataSchema],
    trainings: [trainingDataSchema],
    fellowships: [fellowshipDataSchema],
    grants: [grantDataSchema],
    fellowshipAndGrant: [fellowshipGrantRelationDataSchema],
});

// Models

const Student = mongoose.model('Student', studentSchema);
const CollegeDetail = mongoose.model('CollegeDetail', collegeDataSchema);

// Utility Functions

// College data input sequence functions

// When the colleges input the student data, that data is converted into an object and returned in a size 1 array. This object is not validated, but its format is fixed.
function convertFormDataToObjectArray(formData) {
    return [{
        aadharNo: formData.aadharno,
        rollno: formData.rollno,
        degreeType: formData.degreeType,
        degreeSpecialization: formData.degreeSpecialization,
        collegeAICTEId: formData.collegeAICTEId,
        email: formData.email,
        startTime: formData.startTime,
        endTime: formData.endTime
    }];
}

// When the colleges input the student data as CSV, that data is converted into an array of objects and sent. The array objects are converted into individual student objects and returned as an array. These objects are not validated, but their format is fixed.
function convertCSVDataToObjectArray(formData) {

}

// Inputs an array of student objects and validates each of them individually. The valid records are converted into an array, the invalid records are converted into another array and the collective is returned as an object.
function validateStudentData(studentArray) {
    const validRecords = [];
    const invalidRecords = [];
    for (let student of studentArray) {
        const curStudentValid = _validateStudentObject(student);
        if (curStudentValid) {
            validRecords.push(student);
        } else {
            invalidRecords.push(student);
        }
    }
    return {
        validRecords: validRecords,
        invalidRecords: invalidRecords
    };
}

function _validateGrantAmount(amt) {
    //decimal numbers validation
    var str = amt;
    var re = /^[-+]?[0-9]+\.[0-9][0-9]+$/;
    var found = str.match(re);
    if (found == str) {
        document.getElementById("").innerHTML = result;
    }
}

// Accepts 1 student object, then validates it on all parameters. Returns true if object is valid.
function _validateStudentObject(student) {

    //Date Validation
    inputText = student.startTime;
    function validatedate(inputText) {
        var dateformat = /^[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        // Match the date format through regular expression
        if (inputText.value.match(dateformat)) {
            document.form1.text1.focus();
            //Test which seperator is used '/' or '-'
            var opera1 = inputText.value.split('/');
            var opera2 = inputText.value.split('-');
            lopera1 = opera1.length;
            lopera2 = opera2.length;
            // Extract the string into month, date and year
            if (lopera1 > 1) {
                var pdate = inputText.value.split('/');
            }
            else if (lopera2 > 1) {
                var pdate = inputText.value.split('-');
            }
            var mm = parseInt(pdate[0]);
            var yy = parseInt(pdate[1]);

            // Create list of days of a month [assume there is no leap year by default]
            var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (mm == 1 || mm > 2) {
                if (dd > ListofDays[mm - 1]) {
                    alert('Invalid date format!');
                    return false;
                }
            }
            if (mm == 2) {
                var lyear = false;
                if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                    lyear = true;
                }
                if ((lyear == false) && (dd >= 29)) {
                    alert('Invalid date format!');
                    return false;
                }
                if ((lyear == true) && (dd > 29)) {
                    alert('Invalid date format!');
                    return false;
                }
            }
        }
        else {
            alert("Invalid date format!");
            document.form1.text1.focus();
            return false;
        }
    }

    inputText = student.endTime;
    function validatedate(inputText) {
        var dateformat = /^[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        // Match the date format through regular expression
        if (inputText.value.match(dateformat)) {
            document.form1.text1.focus();
            //Test which seperator is used '/' or '-'
            var opera1 = inputText.value.split('/');
            var opera2 = inputText.value.split('-');
            lopera1 = opera1.length;
            lopera2 = opera2.length;
            // Extract the string into month, date and year
            if (lopera1 > 1) {
                var pdate = inputText.value.split('/');
            }
            else if (lopera2 > 1) {
                var pdate = inputText.value.split('-');
            }
            var mm = parseInt(pdate[0]);
            var yy = parseInt(pdate[1]);

            // Create list of days of a month [assume there is no leap year by default]
            var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (mm == 1 || mm > 2) {
                if (dd > ListofDays[mm - 1]) {
                    alert('Invalid date format!');
                    return false;
                }
            }
            if (mm == 2) {
                var lyear = false;
                if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                    lyear = true;
                }
                if ((lyear == false) && (dd >= 29)) {
                    alert('Invalid date format!');
                    return false;
                }
                if ((lyear == true) && (dd > 29)) {
                    alert('Invalid date format!');
                    return false;
                }
            }
        }
        else {
            alert("Invalid date format!");
            document.form1.text1.focus();
            return false;
        }
    }

    //Aadhaar Format
    function validateAadhaar() {
        var regexp = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
        //var ano = document.getElementById("").value;
        var ano = student.aaadharNo;
        if (regexp.test(ano)) {
            console.log("Valid Aadhaar Number");
            return true;
        } else {
            console.log("Invalid Aadhaar Number");
            return false;
        }
    }
}

// Inputs 1 student object, then checks if some student with the same aadhar id exists in the DB. Returns true if record already exists.
function checkIfStudentObjectExists(student) {

}

// The college details of a student are completely overwritten, ie, the record of the 'student' is accessed, its college array looked up for the roll number, and the corresponding record is fully overwritten by the new details.
function overwriteExistingStudentsCollegeDetails(student) {
    Student.findOne({ aadharNo: student.aadharNo }, (err, stud) => {
        if (err) {
            console.log("Some error occurred while overwriting existing student's college details:", err);
        } else {
            for (let clg of stud.colleges) {
                if (clg.rollNo == student.rollNo && clg.endTime > Date.now() && !clg.successfulCompletion) {
                    clg.degreeType = student.degreeType;
                    clg.degreeSpecialization = student.degreeSpecialization;
                    clg.collegeAICTEId = student.collegeAICTEId;
                    clg.successfulCompletion = student.successfulCompletion;
                    clg.startTime = student.startTime;
                    clg.endTime = student.endTime;
                    break;
                }
            }
            stud.save();
        }
    });
}

// Returns true if for an existing student in the DB, the college roll no. already exists in the colleges array for that student.
function checkIfCollegeRollNoAlreadyExistsForExistingStudent(student) {

}

// Accepts 1 fully valid student record, whose old student record already exists in the DB. The function inserts into the DB document for the existing student, the new college details. 
function insertCollegeRecordToStudent(student) {
    Student.findOne({ aadharNo: student.aadharNo }, (err, stud) => {
        if (err) {
            // TODO: Decide what to do if error occurrs
            console.log("Some error occurred while inserting new college:", err);
        } else {
            const collegeDetails = new CollegeDetail({
                rollNo: student.rollNo,
                degreeType: student.degreeType,
                collegeAICTEId: student.collegeAICTEId,
                degreeSpecialization: student.degreeSpecialization,
                successfulCompletion: false,
                startTime: student.startTime,
                endTime: student.endTime
            });
            stud.colleges.push(collegeDetails);
            stud.save();
        }
    });
}

// Inserts the given student object into the database (as a new record, i.e., for the first time). Assumes the student object is fully valid and complete.
function saveNewRecordToDb(student) {
    const studentaadharNo = student.aadharNo;
    const newPassword = sendNewPasswordTo(studentaadharNo);
    student.password = newPassword;
    const collegeDetails = new CollegeDetail({
        rollNo: student.rollNo,
        degreeType: student.degreeType,
        collegeAICTEId: student.collegeAICTEId,
        degreeSpecialization: student.degreeSpecialization,
        successfulCompletion: false,
        startTime: student.startTime,
        endTime: student.endTime
    });

    const studentInfo = new Student({
        password: student.password,
        aadharNo: student.aadharNo,
        email: student.email,
        colleges: [collegeDetails],
        trainings: [],
        fellowship: [],
        grant: [],
        fellowshipAndGrant: []
    });

    studentInfo.save();
}

// Student communication functions

// Generates a new password, sends an SMS to the phone number associated with the passed aadharNo of the student. It also returns the generated password.
function sendNewPasswordTo(aadharNo) {

    const OTP = otpGenerator.generate(6, { specialChars: false });



    // TODO: Add SMS method.
    request.post('http://my_textbelt_server/text',
        {
            json: {
                number: +918700694558,
                message: OTP
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
    return OTP;
    /*var twilio = require('twilio');

    // Find your account sid and auth token in your Twilio account Console.
    var client = new twilio('ACe1d68fb4daec3c53b8b461d9e6bcdd5d', 'a6b5d4a9d201291bae9a8030db3b2088');
    
    // Send the text message.
    client.messages.create({
      to: '+918130108514',
      from: '+13186687492',
      body: OTP
    });*/
    /* Basic Auth */
    /*lib.Configuration.basicAuthUserName = "YOUR_BASIC_API_KEY";
    lib.Configuration.basicAuthPassword = "YOUR_BASIC_SECRET_KEY";*/

    /* HMAC
        lib.Configuration.hmacAuthUserName = "YOUR_HMAC_API_KEY";
        lib.Configuration.hmacAuthPassword = "YOUR_HMAC_SECRET_KEY";
    */

    /*var controller = lib.MessagesController;

    let body = new lib.SendMessagesRequest();

    body.messages = [];

    body.messages[0] = new lib.Message();

    body.messages[0].content = OTP;
    body.messages[0].destinationNumber = '+614';

    controller.sendMessages(body, function (error, response, context) {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
        }
    });*/
}

const app = express();
app.set('view engine', 'ejs');
app.use(parser.urlencoded({ extended: true }));
app.use("*/css", express.static("public/css"));
app.use("*/img", express.static("public/img"));
app.use("*/videos", express.static("public/videos"));
app.use("*/js", express.static("public/js"));

// Create responses to get, post etc here.

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

app.get('/student_login', (req, res) => {
    res.sendFile(__dirname + '/frontend/student_login.html');
});
app.get('/college_login', (req, res) => {
    res.sendFile(__dirname + '/frontend/college_login.html');
});
app.get('/aicte_login', (req, res) => {
    res.sendFile(__dirname + '/frontend/aicte_login.html');
});
app.get('/own_student_details', (req, res) => {
    res.sendFile(__dirname + '/frontend/own_student_details_display.html');
});
app.get('/insert_new_student_details', (req, res) => {
    res.sendFile(__dirname + '/frontend/insert_new_student_details.html');
});
app.get('/uploading_csv_files', (req, res) => {
    res.sendFile(__dirname + '/frontend/uploading_csv_files.html');
});
app.get('/view_student_details', (req, res) => {
    res.sendFile(__dirname + '/frontend/view_student_details.html');
});
app.get('/after_college_login', (req, res) => {
    res.sendFile(__dirname + '/frontend/after_college_login.html');
});

app.post('/collegeDataInsert', (req, res) => {
    let studentRecordsArray = [];
    if (req.body.formInput) {
        studentRecordsArray = convertFormDataToObjectArray(req.body.formData);
    } else {
        studentRecordsArray = convertCSVDataToObjectArray(req.body.formData);
    }
    const validatedData = validateStudentData(studentRecordsArray);
    const validStudentRecords = validatedData.validRecords;
    const invalidStudentRecords = validatedData.invalidRecords;
    for (let student of validStudentRecords) {
        if (checkIfStudentObjectExists(student)) {
            // 'student' already exists in the DB
            if (checkIfCollegeRollNoAlreadyExistsForExistingStudent(student)) {
                // If for an already existing student, whose details already existed, its present college wants to update the details.
                overwriteExistingStudentsCollegeDetails();
            } else {
                // If an already existing student joins a new college, the details associated with that college are saved.
                insertCollegeRecordToStudent(student);
            }
        } else {
            // 'student' has to be inserted into the DB for the first time
            saveNewRecordToDb(student);
        }
    }
    res.redirect('/after_college_login');
});

app.post('/student_login_information', (req, res) => {
    if(/*credentialsCorrect*/ true) {
        res.redirect('/own_student_details');
    } else {
        res.send('failure page');
    }
});

app.post('/aicte_login_information', (req, res) => {
    res.send('Next Page if creds correct, else error message');
});

app.post('/college_login_information', (req, res) => {
    if(/*credentials are correct*/ true) {
        res.redirect('/after_college_login');
    } else {
        res.send("failure page");
    }
});

app.listen(3000, () => {
    console.log("Server set up to listen on port 3000.");
});