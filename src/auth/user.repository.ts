import { BadRequestException, ConflictException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

import * as bcrypt from "bcrypt"

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signup(authCredentialsDTO: AuthCredentialsDTO):Promise<void>{

        const {password,  username} = authCredentialsDTO

        const user = new User()
        user.username = username;
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.salt)

        try {
            await user.save()
        } catch (error) {
            if (error.code == '23505') {
                throw new ConflictException("Username already exists")
            }else{
                throw new BadRequestException()
                
            }
        }
        
        return
    }

    async validatePassword(authCredentialsDTO: AuthCredentialsDTO): Promise<string>{
        const {username, password} = authCredentialsDTO

        const user = await this.findOne({username})



        if (user && user.validatePassword(password)) {
            return user.username
        }else{
            return null
        }

    }

    async hashPassword(password:string, salt:string): Promise<string>{
        return await bcrypt.hash(password, salt)
    }
}