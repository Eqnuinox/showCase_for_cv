import {UserRepository} from "../repositories";
import {UserOutput} from "../databases/models/User";

class UserService {
    protected userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async createAccount(): Promise<UserOutput> {
        try {
            return await this.userRepository.create();
        } catch (error) {
            throw error;
        }
    }

    public async updateAccount(id: number, data: any): Promise<UserOutput>{
        try {
            return await this.userRepository.update(id, data)
        } catch (error){
            throw error
        }
    }

    public async deleteAccount(id: number){
        try {
            return await this.userRepository.delete(id)
        } catch (error){
            throw error
        }
    }
}

export {UserService}
