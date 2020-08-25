import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {message: 'password needs to include at least one upper case and lower case letter'})
    password: string
}
