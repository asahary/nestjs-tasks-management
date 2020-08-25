import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SignUpDto } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { ISuccessSignInResponse } from './interfaces/success-sign-in-response.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRespository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp (signUpDto: SignUpDto): Promise<void> {
        return await this.userRespository.createUser(signUpDto);
    }

    async signIn (signUpDto: SignUpDto): Promise<ISuccessSignInResponse> {
        const username = await this.userRespository.validateUserPassword(signUpDto);

        if(!username) throw  new UnauthorizedException('Invalid credentials!')

        const payload: IJwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload)

        return { accessToken };
    }
}
