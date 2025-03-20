import { Sequelize, DataTypes, Model } from 'sequelize';
import { IProduct } from '../interfaces/Product';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
});

class Product extends Model<IProduct> implements IProduct {
    public id!: number;
    public title!: string;
    public supermarket!: string;
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    supermarket: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Product'
});

export { sequelize, Product };
