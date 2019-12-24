export const AuthCode = (sequelize, DataTypes) => {
    return sequelize.define('auth_code', {
        auth_code: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        grade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        class: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authority: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}
