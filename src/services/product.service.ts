import {ProductRepository} from "repositories/product.repository";

class ProductService {
    protected ProductRepository: ProductRepository;

    constructor() {
        this.ProductRepository = new ProductRepository();
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

}

export {ProductService}
