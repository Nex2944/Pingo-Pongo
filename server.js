const app = require('express')();

app.get('/', (req, res) => res.send('Server Is Up.'));

module.exports = () => {
  app.listen(3000);
}