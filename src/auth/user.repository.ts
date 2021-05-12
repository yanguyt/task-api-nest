import { BadRequestException, ConflictException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signup(authCredentialsDTO: AuthCredentialsDTO):Promise<void>{

        const user = new User()
        user.username = authCredentialsDTO.username;
        user.password = authCredentialsDTO.password;

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
}