const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//turn routes on
app.use(routes);

//turn connectio to db & server on / force=true db conn must sync > re-create tables if changes
sequelize.sync({force: true}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});