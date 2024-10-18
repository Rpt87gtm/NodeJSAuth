import { Controller, Post, Body, HttpException, UseGuards, HttpStatus, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Request } from 'express';

interface AuthenticatedRequest extends Request{
    user: User;
}

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
    @UseGuards(JwtAuthGuard)
    @Post('protected')
    async protectedRoute() {
        return { message: 'This is a protected route' };
    }

    @UseGuards(JwtAuthGuard)
    @Post('refresh-token')
    async refreshToken(@Req() req: AuthenticatedRequest): Promise<{ token: string }> {
        const user = req.user;
        return this.authService.login(user);
    }
}