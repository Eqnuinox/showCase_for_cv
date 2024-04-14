import {Category, Product} from "../databases/models";

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

const getAllProducts = async () => {
    return await Product.findAll({
        include: [{
            model: Category,
            attributes: ['id', 'name'],
            as: 'product_category',
        }]
    })
}

const getProductsByCategory = async (categoryName: string) => {
    const category = await Category.findOne({
        where: {name: categoryName}
    });

    if (!category) {
        throw new Error(`Category with name ${categoryName} not found`);
    }

    return await Product.findAll({
        where: {categoryId: category?.id}, include: [{
            model: Category,
            attributes: ['id', 'name'],
            as: 'product_category',
        }]
    });

}
