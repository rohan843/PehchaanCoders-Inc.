const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin-rohan:<password>@cluster0.g0nhe.mongodb.net/StudentData');

// Schemas

const studentSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
        match: /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]$/,
        // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$" 
        // at least one uppercase letter, one lowercase letter, one number and one special character //
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
    result: studentResultSchema,   // This is updatable, unlike we thought previously. We may send a reminder to students periodically.
    currentStatus: studentStatusSchema,    // This is updatable, unlike we thought previously. We may send a reminder to students periodically.
    startTime: {
        type: Date, required: true
    },
    endTime: {
        type: Date, required: true
    },
});

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

// Models

const Student = mongoose.model('Student', studentSchema);

const app = express();
app.set('view engine', 'ejs');
app.use(parser.urlencoded({ extended: true }));
app.use("*/css", express.static("public/css"));
app.use("*/img", express.static("public/img"));
app.use("*/js", express.static("public/js"));

// Create responses to get, post etc here.

app.listen(3000, () => {
    console.log("Server set up to listen on port 3000.");
});