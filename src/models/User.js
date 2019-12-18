export const User = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dormitory_point: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        authority: {
            type: DataTypes.ENUM("student", "manager", "teacher"),
            allowNull: false
        },
        validation: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        key_for_verify: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}
