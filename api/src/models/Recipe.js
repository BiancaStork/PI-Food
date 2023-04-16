const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type: DataTypes.UUID, // ME GENERA CON UN ALGORITMO UN id UNICO E IRREPETIBLE
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,  //es el algoritmo que se encarga de el id
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    summary:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    healthScore:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    instructions: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    createInBd: {
      type: DataTypes.BOOLEAN,     
      defaultValue: true,
    },
  
  },{timestamps: false});
};
