import Category from "./Category";
import Product from "./Product";
import Status from "./Status";
import User from "./User";
import UserRole from "./UserRole";
import Token from "./Token";
import VerificationCode from "./VerificationCode";
import Cart from "./Cart";
import CartProduct from "./CartProduct";
import ProductCategory from "./ProductCategory";
import Coupon from "./Coupon";
import FavoriteList from "./FavoriteList";
import UserLoyaltyRole from "./UserLoyaltyRole";
import LoyaltyRoles from "./LoyaltyRoles";
import Invoice from "./Transaction";


export {
    User,
    Product,
    Status,
    VerificationCode,
    UserRole,
    Category,
    Token,
    Cart,
    CartProduct,
    ProductCategory,
    Coupon,
    FavoriteList,
    UserLoyaltyRole,
    LoyaltyRoles,
    Invoice
}

User.hasOne(Token, {foreignKey: 'user_id'})
Token.belongsTo(User, {foreignKey: 'user_id'})

User.hasOne(Cart, {foreignKey: 'user_id', as: 'user_cart'})
Cart.belongsTo(User, {foreignKey: 'user_id', as: 'user_cart'})

Cart.hasMany(CartProduct, {foreignKey: 'cart_id', as: 'products_in_cart'})
CartProduct.belongsTo(Cart, {foreignKey: 'cart_id', as: 'products_in_cart'})

Product.hasMany(CartProduct, {foreignKey: 'product_id', as: 'products_cart'})
CartProduct.belongsTo(Product, {foreignKey: 'product_id', as: 'products_cart'})

User.hasOne(VerificationCode, {foreignKey: 'user_id',})
VerificationCode.belongsTo(User, {foreignKey: 'user_id',})

User.belongsToMany(Status, {through: UserRole, foreignKey: 'user_id', as: 'statuses'})
Status.belongsToMany(User, {through: UserRole, foreignKey: 'status_id', as: 'users'})

User.hasOne(FavoriteList, {foreignKey: 'user_id'})
FavoriteList.belongsTo(User, {foreignKey: 'user_id'})

Product.hasMany(FavoriteList, {foreignKey: 'product_id', as: 'favorite_products'})
FavoriteList.belongsTo(Product, {foreignKey: 'product_id', as: 'favorite_products'})

User.hasOne(UserLoyaltyRole, {foreignKey: 'user_id', as: 'user_loyalty_role'})
UserLoyaltyRole.belongsTo(User, {foreignKey: 'user_id', as: 'user_loyalty_role'})

LoyaltyRoles.hasMany(UserLoyaltyRole, {foreignKey: 'user_loyalty_role_id', as: 'loyalty_roles'})
UserLoyaltyRole.belongsTo(LoyaltyRoles, {foreignKey: 'user_loyalty_role_id', as: 'loyalty_roles'})

Category.belongsToMany(Product, {foreignKey: 'category_id', through: ProductCategory, as: 'product_category'})
Product.belongsToMany(Category, {foreignKey: 'product_id', through: ProductCategory, as: 'product_category'})

User.hasMany(Coupon, {foreignKey: 'user_id', as: "users_coupons"})
Coupon.belongsTo(User, {foreignKey: 'user_id', as: "users_coupons"})

Category.hasMany(Coupon, {foreignKey: 'category_id', as: 'coupon_category'})
Coupon.belongsTo(Category, {foreignKey: 'category_id', as: 'coupon_category'})

Invoice.hasMany(CartProduct, {foreignKey: 'invoice_product_id', as: 'invoice_products'})
CartProduct.belongsTo(Invoice, {foreignKey: 'invoice_product_id', as: 'invoice_products'})

User.hasMany(Invoice, {foreignKey: 'user_id', as: 'user_invoices'})
Invoice.belongsTo(User, {foreignKey: 'user_id', as: 'user_invoices'})

Coupon.hasMany(Invoice, {foreignKey: "coupon_id", as: 'coupon'})
Invoice.belongsTo(Coupon, {foreignKey: 'coupon_id', as: 'coupon'})
