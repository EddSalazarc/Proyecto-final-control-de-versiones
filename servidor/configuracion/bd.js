import mysql from 'mysql2';

const pool= await mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'proyecto-final-web-3'

}).promise();
export  default pool;