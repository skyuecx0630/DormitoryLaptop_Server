export const MorningSong = (sequelize, DataTypes) => {
    return sequelize.define('morning_song', {
        song_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        song_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        }
    })
}
