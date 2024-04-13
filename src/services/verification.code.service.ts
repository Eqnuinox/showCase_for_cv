import {UserRepository} from "../repositories";
import {VerificationCodeRepository} from "../repositories/verification-code.repository";
import {ErrorService} from "./error.service";
import VerificationCode from "../databases/models/VerificationCode";
import {EmailService} from "./email.service";


class VerificationCodeService {
    private userRepository: UserRepository;
    private VerificationCodeRepository: VerificationCodeRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.VerificationCodeRepository = new VerificationCodeRepository()
    }

    public async createVerificationCode(user_id: number) {
        try {
            return await new VerificationCodeRepository().create(user_id);
        } catch (error) {
            throw error
        }
    }

    public async destroyVerificationCode(user_id: number) {
        try {
            return await new VerificationCodeRepository().destroy(user_id);
        } catch (error) {
            throw error
        }
    }

    public async resendVerificationCode(email: string, user_id: number) {
        try {
            let user = await this.userRepository.getUserById(user_id);
            if (!user) {
                throw new ErrorService(404, 'User not found');
            }
            await this.destroyVerificationCode(user.id);
            let code = await this.createVerificationCode(user.id);
            await new EmailService().sendVerificationCode(email, String(code.verification_code));
        } catch (error) {
            throw error
        }
    }

    public async compareVerificationCode(verification_code: number, codeDB: number) {
        try {
            if (verification_code !== codeDB) {
                throw new ErrorService(403, 'Verification code not right');
            }
            return true;
        } catch (error) {
            throw error
        }
    }

    public async checkExpiredVerificationCode(verification_code: VerificationCode) {
        try {
            if (new Date() > verification_code.expired_at) {
                throw new ErrorService(403, 'Verification code expired.');
            }
            return true
        } catch (error) {
            throw error
        }
    }

    public async checkVerificationCode(data: {user_id: number, verification_code: number}) {
        try {
            let user = await new UserRepository().getUserById(data.user_id);
            if (!user) {
                throw new ErrorService(404, 'User not found');
            }
            let codeDB = await this.VerificationCodeRepository.findOne({where: {user_id: user.id}});
            if (!codeDB) {
                throw new ErrorService(404, 'Verification code not found');
            }
            await this.checkExpiredVerificationCode(codeDB);
            await this.compareVerificationCode(data.verification_code, codeDB.verification_code);
            await this.VerificationCodeRepository.destroy(user.id);
            return user;

        } catch (error) {
            throw error
        }
    }
}

export {VerificationCodeService}
