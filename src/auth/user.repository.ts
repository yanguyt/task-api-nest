import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signup(authCredentialsDTO: AuthCredentialsDTO):Promise<void>{

        const user = new User()
        user.username = authCredentialsDTO.username;
        user.password = authCredentialsDTO.password;

        await user.save()

        return
    }
}