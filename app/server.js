const express = require('express');
const errorHandlers = require('./handlers/errorHandlers');
const pug = require('pug');
const path = require('path');
const index = require('./routes/index');
const app = express();

app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "temp")));
app.use('/', index);

app.use(errorHandlers.notFound);

app.use(errorHandlers.flashValidationErrors);

if (app.get('env') === 'development') {
    app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

require('dotenv').config({ path: 'variables.env' });

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), () => {
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});

module.exports = app;