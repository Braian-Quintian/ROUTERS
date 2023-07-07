import { Router } from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const appUsuario = Router();

// Crear la conexión a la base de datos fuera del middleware
const conexion = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USERR,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
});

appUsuario.get("/", (req, res) => {
    conexion.query("SELECT * FROM tb_usuario_M3", (err, result) => {
        err ? res.send(err) : res.send(result);
    });
});

// appUsuario.post("/", (req, res) => {
//     conexion.query(
//         `INSERT INTO tb_usuario_M3 (nom_com, edad) VALUES (?, ?)
//             `,
//         [req.body.nom_com, req.body.edad],
//         (err, data, fils) => {
//             console.log(err);
//             console.log(data);
//             console.log(fils);
//             res.sendStatus(data.affectedRows + 200).send();
//         }
//     );
// });

appUsuario.post('/', (req, res) => {
    conexion.query(`INSERT INTO tb_usuario_M3 SET ? `, req.body, (err, data, fields) => {
        if (err) console.log('ERROR: ' + err);
        console.log('data: \n' + data);
        console.log('\n FIELDS --- \n' + fields);
        res.status(200).send(data);
    });
});

// Middleware para establecer la conexión a la base de datos
appUsuario.use((req, res, next) => {
    console.log("Conexión exitosa");
    next();
});

export default appUsuario;
