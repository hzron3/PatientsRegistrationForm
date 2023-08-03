
    function savePatientDetails() {
        const patientData = {
            firstName: document.getElementById("patientFirstName").value,
            lastName: document.getElementById("patientLastName").value,
            dateOfBirth: document.getElementById("patientDateOfBirth").value,
            idNumber: document.getElementById("patientIdNumber").value,
            address: document.getElementById("patientAddress").value,
            county: document.getElementById("patientCounty").value,
            subCounty: document.getElementById("patientSubCounty").value,
            telephone: document.getElementById("patientTelephone").value,
            email: document.getElementById("patientEmail").value,
            gender: document.getElementById("patientGender").value,
            maritalStatus: document.getElementById("patientMaritalStatus").value
        };

        fetch("/api/savePatient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(patientData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Patient details saved successfully!");
                document.getElementById("patientForm").reset();
            } else {
                alert("Error saving patient details.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        });
    }

    function saveNextOfKinDetails() {
        const nextOfKinData = {
            firstName: document.getElementById("kinFirstName").value,
            lastName: document.getElementById("kinLastName").value,
            dateOfBirth: document.getElementById("kinDateOfBirth").value,
            idNumber: document.getElementById("kinIdNumber").value,
            gender: document.getElementById("kinGender").value,
            relationship: document.getElementById("kinRelationship").value,
            telephone: document.getElementById("kinTelephone").value
        };

        fetch("/api/saveNextOfKin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nextOfKinData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Next of kin details saved successfully!");
                document.getElementById("nextOfKinForm").reset();
            } else {
                alert("Error saving next of kin details.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        });
    }
    
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
app.use(bodyParser.json());

const db = new pg.Pool({
  user: 'Hzron-03',
  password: 'Hzron-03',
  host: 'localhost',
  port: 5500,
  database: 'patients'
});

app.post('/api/savePatient', (req, res) => {
  const patientData = req.body;

  db.query('INSERT INTO patients_details (first_name, last_name, date_of_birth, id_number, address, county, sub_county, telephone, email, gender, marital_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', 
    [patientData.firstName, patientData.lastName, patientData.dateOfBirth, patientData.idNumber, patientData.address, patientData.county, patientData.subCounty, patientData.telephone, patientData.email, patientData.gender, patientData.maritalStatus], 
    (err, result) => {
      if (err) {
        console.error('Error saving patient details:', err);
        res.json({ success: false });
      } else {
        console.log('Patient details saved:', result);
        res.json({ success: true });
      }
    });
});

app.post('/api/saveNextOfKin', (req, res) => {
  const nextOfKinData = req.body;

  db.query('INSERT INTO next_of_kin (first_name, last_name, date_of_birth, id_number, gender, relationship, telephone) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
    [nextOfKinData.firstName, nextOfKinData.lastName, nextOfKinData.dateOfBirth, nextOfKinData.idNumber, nextOfKinData.gender, nextOfKinData.relationship, nextOfKinData.telephone], 
    (err, result) => {
      if (err) {
        console.error('Error saving next of kin details:', err);
        res.json({ success: false });
      } else {
        console.log('Next of kin details saved:', result);
        res.json({ success: true });
      }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

