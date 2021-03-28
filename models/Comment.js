const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Comment extends Model {}

Comment.init(
    {
        id: {
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true,
            allowNull:false
        },
        comment: {
            type:DataTypes.TEXT,
            allowNull:false
        },
        user_id:{
            type:DataTypes.UUID,
            references:{
                model:'user',
                key:'id'
            },
        },
        post_id:{
            type:DataTypes.UUID,
            references:{
                module:'post',
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
        modelName: 'comment',
    }
);

module.exports = Comment;