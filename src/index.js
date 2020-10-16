const express = require ('express');
const morgan = require ('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');

//inicialización
const app = express();

//configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

//funciones que se ejecutan cada vez que un usuario hace una petición-Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(flash());


//variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    next();
});

//urls del servidor-rutes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//código al que el navegador puede acceder-public
app.use(express.static(path.join(__dirname, 'public')));

//sección para empezar el servidor
app.listen(app.get('port'), () => {
    console.log('Server is in port', app.get('port'));
});