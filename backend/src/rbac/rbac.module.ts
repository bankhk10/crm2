import { Module } from '@nestjs/common';
import { RbacController } from './rbac.controller';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from '../common/roles.guard';

@Module({
  imports: [AuthModule],
  controllers: [RbacController],
  providers: [RolesGuard],
})
export class RbacModule {}
