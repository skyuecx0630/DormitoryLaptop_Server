export const Point = (sequelize, DataTypes) => {
    return sequelize.define('point', {
        point_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        }
    })
}
