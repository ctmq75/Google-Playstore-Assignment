const express = require('express');
const morgan = require('morgan');

const app = express();
const cors = require('cors');


app.use(cors());
app.use(morgan('common')); // let's see what 'common' format looks like

const appList = require('./apps-data.js');

app.get('/', (req, res) => {
    res
        .status(200)
        .send("Welcome to Google Play App Search!")
})

app.get('/apps', (req, res) => {
  const { search = "", sort, genres } = req.query;

  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of rating or app');
    }
  }

  if (genres) {
    if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
      return res
        .status(400)
        .send('Genre must be one of the given options');
    }
  }

  let results = appList
        .filter(app =>
            app
              .Genres
              .includes(genres));

  if (sort) {
    results
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });



  }

  res
    .json(results);
});
/*
app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});
*/

module.exports = app