import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtToken } from './jwt-payload.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){ }

    @Post("/signup")
    async signUp(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<void>{
        return await this.authService.singUp(authCredentialsDTO)
    }

    @Post("/signin")
    async singIn(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO):Promise<JwtToken>{
        return this.authService.signIn(authCredentialsDTO)
    }
}
