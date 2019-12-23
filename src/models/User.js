export const User = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        user_id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
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
