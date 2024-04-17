import {TokenRepository} from "repositories";
import {sign} from "jsonwebtoken";

const jwt = require('jsonwebtoken');

class TokenService {
    protected TokenRepository: TokenRepository;

    constructor() {
        this.TokenRepository = new TokenRepository()
    }

    public async generateTokens(id: number) {
        const access_token = sign({id: id}, "access_secret", {expiresIn: "30d"});
        const refresh_token = sign({id: id}, "refresh_secret", {expiresIn: "30d"});
        return {
            access_token: access_token,
            refresh_token: refresh_token
        }
    }

    public async validateAccessToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (e) {
            return null
        }
    }

    public async validateRefreshToken(token: string) {
        try {
            return jwt.verify(token.split(' ')[1], process.env.JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    }

    public async removeToken(refresh_token: string) {
        try {
            return await this.TokenRepository.destroy(refresh_token);
        } catch (error) {
            throw error;
        }
    }

    public async findToken(refresh_token: string) {
        try {
            return await this.TokenRepository.findOne({refresh_token});
        } catch (error) {
            throw error;
        }
    }

    public async saveToken(user_id: number, refresh_token: string) {
        try {
            const tokenData = await this.TokenRepository.findTokenByUserId(user_id);
            if (tokenData) {
                tokenData.refresh_token = refresh_token;
                return await tokenData.save();
            }
            return await this.TokenRepository.create({user_id: user_id, refresh_token: refresh_token});
        } catch (error) {
            throw error;
        }
    }
}

export {TokenService}
