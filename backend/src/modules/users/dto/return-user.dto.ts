export class ReturnUserDto {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'Customer' | 'Provider';
  createdAt: Date;
}
