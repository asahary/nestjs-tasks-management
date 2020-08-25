import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { SignUpDto } from "./dto/signUp.dto";
import { NotFoundException, ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(signUpDto: SignUpDto): Promise<void> {
        const {username, password} = signUpDto;

        var user: User = new User()

        user.username = username;
        user.salt  = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await this.save(user);
        } catch(error) {
            if(error.code === '23505') {// Duplicate error
                throw new ConflictException('Username is already taken');
            }else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(signUp: SignUpDto):Promise<string> {
        const {username, password } = signUp;
        const user = await this.findOne({username: username});

        return user.validatePassword(password) ? username : null;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        
       return await bcrypt.hash(password, salt);
    }
}