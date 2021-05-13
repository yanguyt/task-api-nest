import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtPayload, JwtToken } from './jwt-payload.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    async singUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void>{
        return await this.userRepository.signup(authCredentialsDTO);
    }

    async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<JwtToken>{
        let result = await this.userRepository.validatePassword(authCredentialsDTO)
        if(!result){
            throw new BadRequestException("Invalid Credentials");
        }

        const payload: JwtPayload = {username:result};
        const token = this.jwtService.sign(payload)
        const jwtToken: JwtToken = {token}
        return jwtToken

    }
}
