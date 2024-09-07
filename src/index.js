import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';


import clientesRoutes from './routes/clientes.routes.js'
import productoRoutes from './routes/producto.routes.js'
import categoryRoutes from './routes/categoria.routes.js'

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('port', process.env.PORT || 3000);

// Configuración de vistas
app.set('views', join(__dirname, 'views'));

app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');  

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(express.static(join(__dirname,'public')))
// Rutas
app.use(clientesRoutes,productoRoutes,categoryRoutes)

app.get('/', (req,res)=>{
    res.render('index')
})

// Servidor escuchando
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});

