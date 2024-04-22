import {ProductRepository} from "repositories/product.repository";
import {FavoriteListRepository} from "../repositories";

class ProductService {
    protected ProductRepository: ProductRepository;
    private FavoriteListRepository: FavoriteListRepository;

    constructor() {
        this.ProductRepository = new ProductRepository();
        this.FavoriteListRepository = new FavoriteListRepository();
    }

    public async getAllProducts() {
        try {
            return await this.ProductRepository.getAllProducts();
        } catch (error) {
            throw error
        }
    }

    public async createProduct(data: any) {
        try {
            return await this.ProductRepository.createProduct(data);
        } catch (error) {
            throw error
        }
    }

    public async getProductById(id: number) {
        try {
            return await this.ProductRepository.getProductById(id);
        } catch (error) {
            throw error
        }
    }

    public async deleteProduct(id: number) {
        try {
            return await this.ProductRepository.deleteProduct(id);
        } catch (error) {
            throw error
        }
    }

    public async updateProduct(id: number, data: any) {
        try {
            return await this.ProductRepository.updateProduct(id, data);
        } catch (error) {
            throw error
        }
    }

    public async addToCart(id: number, user_id: number) {
        try {
            return await this.ProductRepository.addToCart(id, user_id);
        } catch (error) {
            throw error
        }
    }

    public async removeFromCart(id: number) {
        try {
            return await this.ProductRepository.removeFromCart(id)
        } catch (error) {
            throw error
        }
    }

    public async getAllProductsInCart(cart_id: number) {
        try {
            return await this.ProductRepository.getAllProductsInCart(cart_id)
        } catch (error) {
            throw error
        }
    }

    public async addProductToFavorite(user_id: number, product_id: number) {
        try {
            return await this.FavoriteListRepository.addProductToFavoriteList(user_id, product_id)
        } catch (error) {
            throw error
        }
    }
    public async removeProductFromFavoriteList(user_id: number, product_id: number) {
        try {
            return await this.FavoriteListRepository.removeProductFromFavoriteList(user_id, product_id)
        } catch (error) {
            throw error
        }

    } public async getAllProductsFromFavoriteList(user_id?: number) {
        try {
            return await this.FavoriteListRepository.getAllProductsFromFavoriteList(user_id)
        } catch (error) {
            throw error
        }
    }

}

export {ProductService}
