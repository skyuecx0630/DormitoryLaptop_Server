export const Laptop = (sequelize, DataTypes) => {
    return sequelize.define('laptop', {
        laptop_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        room: {
            type: DataTypes.ENUM("lab1", "lab2", "lab3", "lab4", "self"),
            allowNull: false
        },
        seat: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    })
}
