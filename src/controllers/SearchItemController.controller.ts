import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Controller } from "./Controller";
import { SearchItemService } from 'src/services';

export class SearchItemController implements Controller {
  constructor(private service: SearchItemService) {};

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if(!req.query.name){
        throw new Error("Item Name is missing");
      }

      if(req.query.name.length === 2){
        throw new Error("Only one item name");
      }
      
      const { name } = req.query;

      const response = await this.service.getSearchItems(name);
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      next(error);
      res.status(httpStatus.BAD_REQUEST).send(error);
    }
  }
}