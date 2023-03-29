const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "genre",
        {
            name: {
                type: DataTypes.STRING
            },
        }
    )
};