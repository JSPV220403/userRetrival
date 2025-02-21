const {  DataTypes } = require("sequelize");
const {sequelize} = require("./db.js"); // Ensure this points to your Sequelize instance

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id:{
    type: DataTypes.STRING,
  },
  name:{
    type: DataTypes.STRING,
    allowNull:false
  },
  designation:{
    type:DataTypes.STRING,
    allowNull:false
  },
  userimage:{
    type: DataTypes.STRING,
    allowNull:false
  },
  active:{
    type:DataTypes.INTEGER
  }
}, {
  tableName: "users", // Name of your database table
  timestamps: false,
});

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

module.exports = User;