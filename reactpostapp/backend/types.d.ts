import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string | number;
  }
}

declare namespace Express {
    export interface Request {
      userId?: string | number; // Use the appropriate type for userId
    }
  }