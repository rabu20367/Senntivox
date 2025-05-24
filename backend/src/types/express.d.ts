import { Document } from 'mongoose';

declare global {
  namespace Express {
    interface User extends Document {
      _id: string;
      id: string;
      name: string;
      email: string;
      role: string;
      avatar?: string;
      matchPassword(password: string): Promise<boolean>;
      getResetPasswordToken(): string;
    }

    interface Request {
      user?: User;
      cookies: {
        [key: string]: string | undefined;
        token?: string;
      };
      headers: {
        [key: string]: string | string[] | undefined;
        authorization?: string;
      };
    }
  }
}

export interface IUserRequest extends Express.Request {
  user?: Express.User;
  body: {
    [key: string]: any;
    name?: string;
    email?: string;
    password?: string;
    currentPassword?: string;
    newPassword?: string;
    role?: string;
  };
}
