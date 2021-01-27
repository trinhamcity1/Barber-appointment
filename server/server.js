const express = require("express");
const db = require("./db/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3001;
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


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

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  