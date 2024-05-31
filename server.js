const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const mysql = require('mysql2/promise');




const app=express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.listen(3000,() => {
  console.log('Server is running on port 3000');
});
app.use(express.static('public'));
app.use(cors());



app.get('/speciality',async (req,res)=> {
  try {
      const connection =  await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          database: 'hospital',
          password: 'Magnus@2004'
        });

      console.log(connection)
      console.log('Call speciality')
      console.log('Connection')
      const [results, fields] = await connection.query(
      ` SELECT * from speciality`
      );
      connection.end();
    
      console.log(results); 
      console.log(fields); 

      res.json(results)
    } catch (err) {
      console.log(err);
    }
});

app.get('/doctor',async (req,res)=> {
  console.log(req.query)
  console.log('******')
  const specialityId = req.query.speciality_id;
  try {
      const connection =  await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          database: 'hospital',
          password: 'Magnus@2004'
        });

      
      const [results, fields] = await connection.query(
     'SELECT * FROM doctor WHERE speciality_id='+specialityId
      );
      connection.end();
    
      console.log(results); 
      console.log(fields); 

      res.json(results)
    } catch (err) {
      console.log(err);
    }
});

app.get('/', function(req, res){

})


app.get('/prescription',async (req,res)=> {
  try {
      const connection =  await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          database: 'hospital',
          password: 'Magnus@2004'
        });

      console.log(connection)
      console.log('Connection')
      const [results, fields] = await connection.query(
      ` SELECT DISTINCT hp.*, hd.name AS doctor_name,hd.speciality_id,hs.name AS speciality_name,
        hdp.firstname AS patient_firstname,
        hdp.middlename AS patient_middlename,
        hdp.lastname AS patient_lastname
        FROM
        hospital.prescription hp
        INNER JOIN hospital.doctor hd ON hp.doctor_id = hd.id
        INNER JOIN hospital.speciality hs ON hd.speciality_id = hs.id
        INNER JOIN hospital.detailsofpatient hdp ON hp.patient_id = hdp.id`
      );
      connection.end();
    
      console.log(results); 
      console.log(fields); 

      res.json(results)
    } catch (err) {
      console.log(err);
    }
});

app.get('/reciept',async (req,res)=> {
  try {
      const connection =  await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          database: 'hospital',
          password: 'Magnus@2004'
        });

      console.log(connection)
      console.log('Connection')
      const [results, fields] = await connection.query(
        'SELECT * FROM `reciept`'
      );
     connection.end();
      console.log(results); 
      console.log(fields); 

      res.json(results)
    } catch (err) {
      console.log(err);
    }
});
app.get('/detailsofpatient',async (req,res)=> {
  try {
      const connection =  await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          database: 'hospital',
          password: 'Magnus@2004'
        });

      console.log(connection)
      console.log('Connection')
      const [results, fields] = await connection.query(
        'SELECT * FROM `detailsofpatient`'
      );
      connection.end();
    
      console.log(results); 
      console.log(fields); 

      res.json(results[0])
    } catch (err) {
      console.log(err);
    }
});
app.get('/bill',async (req,res)=> {
  try {
      const connection =  await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          database: 'hospital',
          password: 'Magnus@2004'
        });

      console.log(connection)
      console.log('Connection')
      const [results, fields] = await connection.query(
        'SELECT * FROM `bill`'
      );
      connection.end();
    
      console.log(results); 
      console.log(fields); 

      res.json(results)
    } catch (err) {
      console.log(err);
    }
});
app.get('/report',async (req,res)=> {
  try {
      const connection =  await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          database: 'hospital',
          password: 'Magnus@2004'
        });

      console.log(connection)
      console.log('Connection')
      const [results, fields] = await connection.query(
        'SELECT * FROM `report`'
      );
      connection.end();
    
      console.log(results); 
      console.log(fields); 

      res.json(results)
    } catch (err) {
      console.log(err);
    }
});
app.post('/appointment', async (req, res) => {
  console.log('************')
  console.log(JSON.stringify(req.body))
  const { doctor, patient, time, date, speciality, status } = req.body;
  const connection =  await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hospital',
    password: 'Magnus@2004'
  });
  
  const sql = 'INSERT INTO appointment (time,date, patient_id, doctor_id, speciality_id) VALUES (?, ?, ?, ?, ?)';
  
  connection.query(sql, [ time,date,patient, doctor, speciality], (err, result) => {
    connection.end(x);
    if (err) {
      console.error('Error inserting appointment:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('Appointment created successfully');
  });
});
app.get('/appointments',async (req,res)=> {
  try {
      const connection =  await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          database: 'hospital',
          password: 'Magnus@2004'
        });

      console.log(connection)
      console.log('Connection')
      const [results, fields] = await connection.query(
      `SELECT a.id AS sr_no, a.time, a.date, d.name AS doctor_name, p.firstname AS patient_firstname,
       p.middlename AS patient_middlename,
       p.lastname AS patient_lastname,
       s.name AS speciality_name
       FROM 
       appointment a
       INNER JOIN 
       doctor d ON a.doctor_id = d.id
       INNER JOIN 
       detailsofpatient p ON a.patient_id = p.id
       INNER JOIN 
      speciality s ON a.speciality_id = s.id`

      );
      connection.end();
    
      console.log(results); 
      console.log(fields); 

      res.json(results)
    } catch (err) {
      console.log(err);
    }
});

