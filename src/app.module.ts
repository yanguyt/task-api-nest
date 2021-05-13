import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import {JwtModule} from "@nestjs/jwt"
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.register({
      secret: "testeSecret",
      signOptions:{
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule
  ],
})
export class AppModule {}
