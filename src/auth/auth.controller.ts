import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { ISuccessSignInResponse } from './interfaces/success-sign-in-response.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    async signUp(
        @Body() signUpDto: SignUpDto
    ): Promise<void>{
        await this.authService.signUp(signUpDto);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    async signIn(
        @Body() signUpDto: SignUpDto
    ): Promise<ISuccessSignInResponse>{
        return await this.authService.signIn(signUpDto);
    }
}
