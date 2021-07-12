const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create user model
class User extends Model { }

//define table columns & config
User.init(
    {
        //define id column
        id:{
            //use spec Sequelize DatatTypes object  what type of data it is
            type: DataTypes.INTEGER,
            //equiv of SQL's NOT NULL option
            allowNull: false,
            //instruct that is is primary key
            primaryKey: true,
            //turn on auto increment
            autoIncrement: true
        },
        //define username col
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define email col
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //cannot be any dup email vaules in table
            unique: true,
            //if allowNull is set to false, can run data thru validators
            validate: {
                isEmail: true
            }
        },
        //define passwoed col
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //this means password must be at least four CHAR long
                len: [4]
            }
        }
    },
    {
        //table config options here
        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;
