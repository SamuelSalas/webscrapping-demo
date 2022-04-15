
import { searchItemService } from '../services';
import { SearchItemController } from './SearchItemController.controller';

export const searchItemController = new SearchItemController(searchItemService);