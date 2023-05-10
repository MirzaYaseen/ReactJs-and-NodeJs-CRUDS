const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoutes = require('./routes/books');

const app = express();


app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Books API');
});

app.use('/books', bookRoutes);

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
