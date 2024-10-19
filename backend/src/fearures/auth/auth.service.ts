import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "@entities/user/user.entity";
import * as bcrypt from 'bcrypt';
import { JwtService  } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ){}

    async register(username: string, password: string): Promise<User>{
        const hashedPassword = await bcrypt.hash(password,10);
        const user = this.usersRepository.create({
            username,
            password: hashedPassword
        });
        return this.usersRepository.save(user);
    }

    async validateUser(username: string, password: string): Promise<User | null>{
        const user = await this.usersRepository.findOne({where: {username}});
        if (user && (await bcrypt.compare(password,user.password))){
            return user;
        }
        return null;
    }

    async login(user: User): Promise<{token: string}>{
        const payload = {username: user.username, sub: user.id};
        return {
            token: this.jwtService.sign(payload),
        };
    }

}