import { Controller, Post, Body, HttpException, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";

@Controller()
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('register')
    async register(@Body() user: User): Promise<User>{
        return this.authService.register(user.username, user.password);
    }

    @Post('login')
    async login(@Body() user: User): Promise<{token: string}>{
        const validUser = await this.authService.validateUser(user.username, user.password);
        if(!validUser){
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return this.authService.login(validUser);
    }
}