const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db/db')
const userRoute = require('./routes/user.route');
const bodyParser = require("body-parser");

db.connectToMongoDB()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('index.html')
  })

  app.get('/api/users/thanks', (req, res) => {
    res.send('index.html')
  })

app.use("/api", userRoute)

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
