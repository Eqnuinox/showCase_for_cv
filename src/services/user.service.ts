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
}

export {UserService}
