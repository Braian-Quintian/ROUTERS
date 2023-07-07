import express from 'express';
import dotenv from 'dotenv';
import appUsuario from './routers/usuario.js';
const appExpress = express();
dotenv.config();

appExpress.use(express.json());
const configuracion = JSON.parse(process.env.CONFIG);
const { port, hostname } = configuracion;


appExpress.use('/cliente', appUsuario);

appExpress.use('/', (req, res, next) => {
  res.send('Welcome');
});

appExpress.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});