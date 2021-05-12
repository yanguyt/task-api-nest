import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}

    async singUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void>{
        return await this.userRepository.signup(authCredentialsDTO);
    }

    async signIn(authCredentialsDTO: AuthCredentialsDTO){
        let result = await this.userRepository.validatePassword(authCredentialsDTO)
        if(!result){
            throw new BadRequestException("Invalid Credentials");
            
        }
    }
}
