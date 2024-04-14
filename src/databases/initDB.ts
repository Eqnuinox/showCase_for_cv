import User from "./models/User";
import Status from "./models/Status";
import VerificationCode from "./models/VerificationCode";
import Product from "./models/Product";



async function syncModels() {
    try {
        await Status.sync();
        await User.sync();
        await Product.sync();
        await VerificationCode.sync();

        console.log('Models have been successfully added to the source data.');
    } catch (error) {
        console.error('Error adding models to database:', error);
    }
}
export default syncModels
