  var express = require('express'),
  request = require('request'),
  passport = require('passport'),
  flash = require('connect-flash'),
  morgan = require('morgan'),
  cookieParser = require('cookie-parser'),
  session = require('express-session')
  app = express();
  var bodyParser = require('body-parser');
  var mysqlModel = require('mysql-model');
  var routes = require('./api/routes/testeRoutes');

  require('./config/passport')(passport);
//  port = process.env.PORT || 3000;
//var connection = require('./dbConnection');

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


routes(app,passport);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

var interval = 1200000;
function doPosts() {
    request.get(
        'http://localhost:3000/teste',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );
    setTimeout(doPosts, interval);
}
//doPosts();
