import { Router, Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { searchItemController } from '../controllers';

export const register = (router: Router) => {
  router.get('/', (req: Request, res: Response) => {
    res.status(httpStatus.OK).send( "Hello world!" );
});
  
  router.get('/search', (req: Request, res: Response, next: NextFunction) => searchItemController.run(req, res, next));
};