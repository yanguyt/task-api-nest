import { Body, Controller, Post,Get, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtToken } from './jwt-payload.dto';
import { User } from './user.entity';

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

    @Get("/test")
    @UseGuards(AuthGuard())
    teste(@GetUser() user: User){
         console.log(user)
    }

}
