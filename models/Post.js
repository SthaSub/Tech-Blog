const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Post extends Model {}

Post.init(
    {
        id: {
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true,
            allowNull:false
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description: {
            type:DataTypes.TEXT,
            allowNull:false
        },
        user_id:{
            type:DataTypes.UUID,
            references:{
                model:'user',
                key:'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;