import { Request, Response, NextFunction } from 'express';

export interface Controller {
  run(req: Request, res: Response, next: NextFunction): Promise<void>;
}