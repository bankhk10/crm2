import { Injectable, UnauthorizedException } from '@nestjs/common';

interface User {
  username: string;
  password: string;
  role: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [
    { username: 'admin', password: 'password', role: 'admin' },
    { username: 'ceo', password: 'password', role: 'ceo' },
  ];

  login(username: string, password: string) {
    const user = this.users.find(
      (u) => u.username === username && u.password === password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return { token: user.username, role: user.role };
  }

  validate(token: string) {
    return this.users.find((u) => u.username === token);
  }

  listUsers() {
    return this.users.map(({ username, role }) => ({ username, role }));
  }
}
