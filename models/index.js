const Post = require('./Post');
const User = require('./User');

//create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//reverse association, constraint post belongs to only one User
Post.belongsTo(User, {
    foreignKey: 'user_id',
});



module.exports = { User, Post };

