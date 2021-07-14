const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create user model
class User extends Model { 
    //set up method to run on instance date/user to check passwoed
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//define table columns & config
User.init(
    {
        //define id column
        id: {
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
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
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
