import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'JWT_KEY',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
