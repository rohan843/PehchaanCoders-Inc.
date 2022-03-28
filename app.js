const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');

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
        type: String, required: true
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
        type: Date, required: true
    },
    endTime: {
        type: Date, required: true
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
        if(curStudentValid) {
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

// Accepts 1 student object, then validates it on all parameters. Returns true if object is valid.
function _validateStudentObject(student) {

}

// Inputs 1 student object, then checks if some student with the same aadhar id exists in the DB. Returns true if record already exists.
function checkIfStudentObjectExists(student) {

}

// Returns true if for an existing student in the DB, the college roll no. already exists in the colleges array for that student.
function checkIfCollegeRollNoAlreadyExistsForExistingStudent(student) {

}

// Accepts 1 fully valid student record, whose old student record already exists in the DB. The function inserts into the DB 
function insertCollegeRecordToStudent(student) {

}

// Inserts the given student object into the database (as a new record). Assumes the student object is fully valid and complete.
function saveNewRecordToDb(student) {
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



const app = express();
app.set('view engine', 'ejs');
app.use(parser.urlencoded({ extended: true }));
app.use("*/css", express.static("public/css"));
app.use("*/img", express.static("public/img"));
app.use("*/js", express.static("public/js"));

// Create responses to get, post etc here.

app.get('/', (req, res) => {
    res.send('//');
});

app.post('/collegeDataInsert', (req, res) => {
    let studentRecordsArray = [];
    if(req.body.formInput) {
        studentRecordsArray = convertFormDataToObjectArray(req.body.formData);
    } else {
        studentRecordsArray = convertCSVDataToObjectArray(req.body.formData);
    }
    const validatedData = validateStudentData(studentRecordsArray);
    const validStudentRecords = validatedData.validRecords;
    const invalidStudentRecords = validatedData.invalidRecords;
});

app.listen(3000, () => {
    console.log("Server set up to listen on port 3000.");
});