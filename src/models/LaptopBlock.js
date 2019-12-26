export const LaptopBlock = (sequelize, DataTypes) => {
    return sequelize.define('laptop_block', {
        block_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        starts_at: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
        ends_at: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        activated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
}
