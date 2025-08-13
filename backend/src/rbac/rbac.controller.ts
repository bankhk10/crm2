import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@Controller('rbac')
@UseGuards(RolesGuard)
export class RbacController {
  constructor(private readonly authService: AuthService) {}

  @Get('users')
  @Roles('admin')
  getUsers() {
    return this.authService.listUsers();
  }
}
