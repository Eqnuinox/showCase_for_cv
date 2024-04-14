import {UserRepository} from "../repositories";
import {UserOutput} from "../databases/models/User";
import {VerificationCodeService} from "./verification.code.service";
import {VerificationCodeRepository} from "repositories/verification-code.repository";
import {ErrorService} from "./error.service";
import {EmailService} from "./email.service";
import {sendVerificationCode} from "../controllers/users";

class UserService {
    protected userRepository: UserRepository;
    private VerificationCodeRepository: VerificationCodeRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.VerificationCodeRepository = new VerificationCodeRepository();
    }

    public async createAccount(): Promise<UserOutput> {
        try {
            return await this.userRepository.create();
        } catch (error) {
            throw error;
        }
    }

    public async updateAccount(id: number, data: any): Promise<UserOutput> {
        try {
            return await this.userRepository.update(id, data)
        } catch (error) {
            throw error
        }
    }

    public async deleteAccount(id: number) {
        try {
            return await this.userRepository.delete(id)
        } catch (error) {
            throw error
        }
    }

    public async getAllUsers() {
        try {
            return await this.userRepository.getAllUsers()
        } catch (error) {
            throw error
        }
    }

    public async getUserById(id: number) {
        try {
            return await this.userRepository.getUserById(id)
        } catch (error) {
            throw error
        }
    }

    public async sendVerificationCode(data: { user_id: number, email: string }) {
        try {
            let user = await this.userRepository.getUserById(data.user_id);
            if (!user) {
                throw new ErrorService(404, 'User with this email nof found.')
            }
            let verificationCode = await this.VerificationCodeRepository.create(user.id);
            await new EmailService().sendVerificationCode(data.email, String(verificationCode.verification_code))
            return true
        } catch (error) {
            throw error
        }
    }

    public async verifiedUser(user_id: number, email: string) {
        try {
            let user = await this.userRepository.getUserById(user_id);
            let allUsers = await this.getAllUsers();
            if (!user) {
                throw new ErrorService(404, 'User with this email nof found.')
            }

            const userExists = allUsers.some(user => user.email === email);
            if (userExists) {
                throw new ErrorService(409, 'User with this email already exists.')
            }
            await this.updateUserStatus(user_id, ['User']);
            return await this.updateAccount(user_id, {email: email, is_verified: true})
        } catch (error) {
            throw error
        }
    }

    public async login(email: string) {
        try {
            let user = await this.userRepository.findOne({email});
            if (!user) {
                throw new ErrorService(404, 'User with this email nof found.')
            }
            await this.sendVerificationCode({user_id: user.id, email})
        } catch (error) {
            throw error
        }
    }

    public async updateUserStatus(id: number, statuses: string[]) {
        try {
            let user = await this.userRepository.getUserById(id);
            if (!user) {
                throw new ErrorService(404, 'User nof found.')
            }
            return await this.userRepository.updateUserStatus(id, statuses);
        } catch (error) {
            throw error
        }
    }
}

export {UserService}
