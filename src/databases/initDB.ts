import {Product, Status, User, UserRole, VerificationCode, Category} from "./models";


async function syncModels() {
    try {
        await Status.sync();
        await User.sync();
        await Category.sync();
        await Product.sync();
        await VerificationCode.sync();
        await UserRole.sync();

        console.log('Models have been successfully added to the source data.');
    } catch (error) {
        console.error('Error adding models to database:', error);
    }
}

export default syncModels
