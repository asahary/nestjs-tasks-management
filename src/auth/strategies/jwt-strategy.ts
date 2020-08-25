import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtfromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'saha'
        })
    }

    async validate(payload: IJwtPayload) {
        const { username } =  payload;

        const user = this.userRepository.findOne({ username })

        if(!user) throw new UnauthorizedException('Expired token')

        return user;
    }
}

