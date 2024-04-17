import {Category, Product, ProductCategory} from "../databases/models";
import product from "../databases/models/Product";

export const getProductsByFiltersOrAll = async (categoryName: string) => {
    //All
    if (!categoryName) {
        return await getAllProducts();
    }
    //EVENT_TYPE
    if (!!categoryName) {
        return await getProductsByCategory(categoryName);
    }
}

let includeRule = [{
    model: Category,
    attributes: ['id', 'name'],
    as: 'product_category',
    through: {attributes: []}
}];

const getAllProducts = async () => {
    return await Product.findAll({include: includeRule})
}

const getProductsByCategory = async (categoryName: string) => {
    const category = await Category.findAll({where: {name: categoryName}});

    if (!category) {
        throw new Error(`Category with name ${categoryName} not found`);
    }

    const categoryId = category[0].id;

    const productCategories = await ProductCategory.findAll({where: {category_id: categoryId}});

    const productIds = productCategories.map((pc) => pc.product_id);
    // @ts-ignore
    return await Product.findAll({where: {id: productIds}, include: includeRule});
}
