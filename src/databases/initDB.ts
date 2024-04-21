import {
    Cart,
    CartProduct,
    Category,
    Coupon,
    FavoriteList,
    Invoice,
    LoyaltyRoles,
    Product,
    ProductCategory,
    Status,
    Token,
    User,
    UserLoyaltyRole,
    UserRole,
    VerificationCode
} from "./models";


async function syncModels() {
    try {
        await Status.sync();
        await User.sync();
        await Cart.sync();
        await VerificationCode.sync();
        await Token.sync();
        await LoyaltyRoles.sync();
        await UserLoyaltyRole.sync();
        await Category.sync();
        await Coupon.sync();
        await UserRole.sync();
        await Product.sync();
        await FavoriteList.sync();
        await Invoice.sync()
        await CartProduct.sync();
        await ProductCategory.sync();


        console.log('Models have been successfully added to the source data.');
    } catch (error) {
        console.error('Error adding models to database:', error);
    }
}

export default syncModels
