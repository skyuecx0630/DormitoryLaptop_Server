export const Notice = (sequelize, DataTypes) => {
    return sequelize.define('notice', {
        notice_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contents: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.ENUM("manager", "teacher"),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        }
    })
}
