import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RbacModule } from './rbac/rbac.module';

@Module({
  imports: [AuthModule, RbacModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
