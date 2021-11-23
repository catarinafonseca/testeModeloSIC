const { Sequelize, Model, DataTypes } = require('sequelize'); 
const sequelize = new Sequelize.Sequelize('joaoferr_tsiw', 'joaoferr_tsiw', 'GAa8xvmV3eKrVa8C', {
    host: 'www.joaoferreira.eu', 
    dialect: 'mysql'
})

class Client extends Model {}

Client.init({
    name: DataTypes.STRING, 
    age: DataTypes.INTEGER,
    phone:DataTypes.INTEGER,
    email: DataTypes.STRING, 
    nif: DataTypes.INTEGER,
    locality:DataTypes.STRING,
    username: DataTypes.STRING, 
    password: DataTypes.STRING 
}, { sequelize, modelName: 'clientes-40190064'})

sequelize.sync().then().catch(error => {
    console.log(error); 
})

exports.Client = Client;