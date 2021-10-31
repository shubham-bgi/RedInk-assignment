const posts = require("./posts");

module.exports = function(sequelize, DataTypes) {
    var authors = sequelize.define("authors", {
        authorId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    authors.hasMany(posts, {
        as: 'authors',
        foreignKey: 'authorId',
        sourceKey: 'authorId',
        targetKey: 'authorId'
    });
    posts.belongsTo(authors, {
        foreignKey: 'authorId',
        sourceKey: 'authorId',
        targetKey: 'authorId'
    });
    return authors;
}