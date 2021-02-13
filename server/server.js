const express = require("express");
const db = require("./db/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3001;
const morgan = require("morgan");
const bcrypt = require('bcrypt');
const saltRounds = 10
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


//login as barber
app.post("/api/v1/barberlogin", async(req, res) => {
  const barber_name = req.body.barber_name;
  const barber_password = req.body.barber_password;
  try {
  const login = await db.query(
    "SELECT * FROM barberapointment.barber WHERE barber_name = ? AND barber_password = ?",
    [barber_name, barber_password],
    (err, results) => {
      if (err) {
        res.status(200).json({
          status: "there is an error",
          results,
        });
        console.log({ err: err });
      }

      if (results.length > 0) {
        console.log(results)
        res.status(201).json({
          results,
        });
      } else {
        res.status(200).json({
          status: "Wrong barber login name or password!",
          results,
        });
        console.log({ message: "Wrong barber login name or password!" });
      }
    }
  );
  }catch (err) {
    console.log(err);
    }
});

//login as customer
app.post("/api/v1/customerlogin", async(req, res) => {
  const customer_name = req.body.customer_name;
  const customer_password = req.body.customer_password;

  
  try {
  const login = await db.query(
    "SELECT * FROM barberapointment.customer WHERE customer_name = ? AND customer_password = ?",
    [customer_name, customer_password],
    (err, results) => {
      if (err) {
        res.status(200).json({
          status: "there is an error",
          results,
        });
        console.log({ err: err });
      }

      if (results.length > 0) {
        console.log(results)
        res.status(200).json({
          results,
        });
      } else {
        res.status(201).json({
          status: "Wrong customer login name or password!",
          results,
        });
        console.log({ message: "Wrong customer login name or password!" });
      }
    }
  );
  }catch (err) {
    console.log(err);
    }
});


// get all barber
app.get("/barber", (req, res) => {
    const sql = "SELECT * FROM barberapointment.barber;";
    const query = db.query(sql, (err, results) => {
      if (err) throw err;
      console.log(results);
      res.status(200).json({
        status: "yessire",
        results,
      });
    });
  });

// get all customer
app.get("/customer", (req, res) => {
  const sql = "select * from barberapointment.customer;";
  const query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.status(200).json({
      status: "success",
      results,
    });
  });
});
//create a barber 
app.post("/api/v1/createbarber", async (req, res) => {
  console.log(req.body);
  const barber_name = req.body.barber_name;
  const barber_password = req.body.barber_password;
  try{
      const barber =  await db.query(
        "INSERT INTO barberapointment.barber (barber_name, barber_password) VALUES (?, ?);",
        [barber_name, barber_password],
        (err, results) =>{
          if (err) {
            res.status(200).json({
              status: "Your username was already chosen",
              data: results,
            });
            console.log({ message: "Your username was already chosen" });
          };
          console.log(results);
          res.status(200).json({
            status: "success",
            data: results,
          });
          
        });
      } catch (err) {
        console.log(err);
        }
      });

  //create a customer 
app.post("/api/v1/createcustomer",  (req, res) => {
  console.log(req.body);
  const customer_name = req.body.customer_name;
  const customer_password = req.body.customer_password;


bcrypt.hash(customer_password, saltRounds, (err, hash)=>{

      const barber =  db.query(
        "INSERT INTO barberapointment.customer (customer_name, customer_password) VALUES (?, ?);",
        [customer_name, hash],
        (err, results) =>{
          if (err) throw err;
          console.log(results);
          res.status(200).json({
            status: "success",
            data: results,
          });
        });
  
})

 

      });

//barber give out his schedule
app.post("/api/v1/createsection", async (req, res) => {
  console.log(req.body);
  const sec_date = req.body.sec_date;
  const sec_month = req.body.sec_month;
  const sec_year = req.body.sec_year;
  const sec_info_id = req.body.sec_info_id;
  const barber_id = req.body.barber_id;
  const sec_id = req.body.sec_id;
  try{
      const section =  await db.query(
        "INSERT INTO barberapointment.section (sec_date, sec_month, sec_year, sec_info_id) VALUES (?, ?, ?, ?);",
        [sec_date, sec_month, sec_year, sec_info_id],
        );
        const recall_section =  await db.query(
          "select * from barberapointment.section where sec_id=LAST_INSERT_ID();",

          (err, results) =>{
            if (err) throw err;
            console.log(results);
            res.status(200).json({
              status: "success",
              data: results,
            });
          }
          );
          // const insert_appointment_barber =  await db.query(
          //   "INSERT INTO barberapointment.apointment (barber_id, sec_id) VALUES (?, ?);",
          //   [barber_id, sec_id],
          //   (err, results) =>{
          //     if (err) throw err;
          //     console.log(results);
          //     res.status(200).json({
          //       status: "success",
          //       data: results,
          //     });
          //   }
          //   );
      } catch (err) {
        console.log(err);
        }
      });


//barber confirm available time
app.post("/api/v1/confirmsection", async (req, res) => {
  console.log(req.body);
  const sec_date = req.body.sec_date;
  const sec_month = req.body.sec_month;
  const sec_year = req.body.sec_year;
  const sec_info_id = req.body.sec_info_id;
  const barber_id = req.body.barber_id;
  const sec_id = req.body.sec_id;
  const apointment_id = req.body.sec_id
  try{

          const insert_appointment_barber =  await db.query(
            "INSERT INTO barberapointment.apointment (barber_id, sec_id) VALUES (?, ?);",
            [barber_id, sec_id],
            );
            const recall_section =  await db.query(
              "select * from barberapointment.apointment where apointment_id=LAST_INSERT_ID();",

              (err, results) =>{
                if (err) throw err;
                console.log(results);
                res.status(200).json({
                  status: "success",
                  data: results,
                });
              }
              );

      } catch (err) {
        console.log(err);
        }
      });
//customer take the section
app.post("/api/v1/takesection", async (req, res) => {
  console.log(req.body);
  const sec_date = req.body.sec_date;
  const sec_month = req.body.sec_month;
  const sec_year = req.body.sec_year;
  const sec_info_id = req.body.sec_info_id;
  const barber_id = req.body.barber_id;
  const sec_id = req.body.sec_id;
  const apointment_id = req.body.apointment_id;
  const customer_id = req.body.customer_id;
  try{

          const itake_appointment_barber =  await db.query(
            "UPDATE barberapointment.apointment SET customer_id = ? WHERE apointment_id = ?;",
            [customer_id, apointment_id ]);
            


          
            const register_for_section =  await db.query(
              "select * from `barberapointment`.`apointment` where `apointment_id`= ?;",
              [apointment_id],
              (err, results) =>{
                if (err) throw err;
                console.log(results);
                res.status(200).json({
                  status: "success",
                  data: results,
                });
              }
              );

      } catch (err) {
        console.log(err);
        }
      });

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  