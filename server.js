const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json()); // To parse JSON bodies + middleware

// Serve static files like CSS, JS
app.use(express.static(__dirname));

// Route handlers
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/signUp", (req, res) => {
  res.sendFile(path.join(__dirname, "signUp.html"));
});

app.get("/signIn", (req, res) => {
  res.sendFile(path.join(__dirname, "signIn.html"));
});

app.get("/discussion", (req, res) => {
  res.sendFile(path.join(__dirname, "discuss.html"));
});

app.post("/post", (req, res) => {
  console.log("POST", "yes");
  write(req, res);
});

app.post("/data", (req, res) => {
  read(req, res);
});

// Function to handle writing data
function write(req, res) {
  let body = req.body;
  fs.readFile("data.json", "utf-8", (err, data) => {
    if (err) console.log(err);
    else {
      let arr = [];
      let indx = -1;
      if (data) {
        data = JSON.parse(data);
        arr = data;
        indx = arr.findIndex((obj) => obj.email === body.email);
      }
      if (indx != -1) {
        res.end(JSON.stringify(indx));
      } else {
        arr.push(body);
        fs.writeFile("data.json", JSON.stringify(arr), (err) => {
          if (err) console.log(err);
          else console.log("data saved");
        });
        res.end(JSON.stringify(indx));
      }
    }
  });
}

 function read(req, res) {
  let body = req.body;
  fs.readFile("data.json", "utf-8", (err, data) => {
    if (err) console.log(err);
    else {
      let indxs;
      data = JSON.parse(data);
      indxs = data.findIndex(
        (obj) => obj.email === body.email && obj.password === body.password
      );
      res.end(JSON.stringify(indxs));
    }
  });
}

const PORT = 5100;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
