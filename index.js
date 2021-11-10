const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const pa11y = require("pa11y");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post("/api/accessibility", async function(req, res) {
  if (!req.body.url) {
    res.status(400).json({ error: "url is required" });
  } else {
    const result = await pa11y(req.body.url);
    res.status(200).json({ result });
  }
})

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
})