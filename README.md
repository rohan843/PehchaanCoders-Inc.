# Pehchaan

## Viewing Presentation Documents

The 3 documents as per the template are present [here](https://github.com/rohan843/PehchaanCoders-Inc./tree/master/Presentation%20Docs).

## View Deployment

The website deployment is visible [here](https://aqueous-cliffs-29467.herokuapp.com/).

## Test the website

Currently, the website is in its initial stages of development. In time, new screens and features will be made live. The existing deployment features the following:

1. Student, college, and AICTE login pages (None of the 3 pages right now have validation of input, so any login credentials will work. This is temporarily done for checking of further pages.)
2. The basic view of the student details page, arrived at after going to the student login page and logging in. It currently features 2 buttons, which allow for password change and details updation. The existing studnet details shall be displayed in the remailder of the page. This page is still under development, as is currently in its early stages.
3. On going to the college login page, and entering any credentials (These can be any creds for now. We'll add password based validation soon, in future development phases), a successfully logged in page is displayed. Here, a college can insert/update the details of 1 student, of multiple students via a CSV file, and also view the details of its current students and alumnii (Only the details associated with that college) by pressing the correct buttons. Of these 3, the 'insert new student details' option is currently functional, the remaining 2 are yet to be implemented.
4. For viewing the details of the college's students, we are in the process of creating an interface that allows for this viewing. This interface can be reached at by going to the 'view student details' option, as stated in the above point. Although the details are being added to the database, the viewing interface is under development right now.
5. The AICTE login page doesn't redirect to any page yet, this component is still under development.

## The details of student data stored

The schemas associated with a student are of the following form:

```javascript
const studentSchema = {
    password: 'The password of the student, to be used for verification',
    aadharNo: 'The Aadhar Id of the student, which is intended to be used as an identification, and also to be able to use this database along with the Aadhar database',
    email: 'The mail id of the student, to be used for emails and prompts as needed'
    colleges: [
        "An array consisting of the relevant details of a student with regard to their college, for example, the degree pursued. We store this as a time based list. All colleges attended by a student will be visible here."
    ],
    trainings: [
        "An array consisting of the details about various trainings recieved by a student."
    ],
    fellowships: [
        "An array consisting of the info about the various fellowships recieved by a student."
    ],
    grants: [
        "An array consisting of the info about the various grants recieved by a student."
    ],
    fellowshipAndGrant: [
        "An array that associates those fellowships and grants that were recieved by the student together, i.e., as one component, using their respective id's"
    ]
};
```

Note: As it currently stands, only the college details part is being modified as stated in the points above. The remaining information about the trainings etc. will be modifiable by the student only, and that component is still under development right now.