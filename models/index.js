const User = require('./User');
const Post = require('./Post');

//create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//reverse association, constraint post belongs to only one User
Post.belongsTo(User, {
    foreignKey: 'user_id',
});



module.exports = { User, Post };

