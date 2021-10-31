const authors = require("./authors");

module.exports = function(sequelize, DataTypes) {
    var posts = sequelize.define("posts", {
        postsId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return posts;
}