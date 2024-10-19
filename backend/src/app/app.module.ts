import { Module } from '@nestjs/common';
import { AppController } from '../fearures/controllers/app.controller';
import { AppService } from '../fearures/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'fearures/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'rpt87gtm',
      password: 'qwerty',
      database: 'testpostgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
