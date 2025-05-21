import { Router } from 'express';
import { CreateCarEntryDto } from '../dtos/carEntry.dto';
import { checkLoggedIn } from '../middlewares/auth.middleware';
import { validationMiddleware } from '../middlewares/validator.middleware';
import carEntryController from '../controllers/carEntry.controller';

const carEntryRouter = Router();

carEntryRouter.post('/entry', checkLoggedIn, validationMiddleware(CreateCarEntryDto), carEntryController.registerCarEntry);
carEntryRouter.put('/exit/:plateNumber', checkLoggedIn, carEntryController.registerCarExit);
carEntryRouter.get('/cars-inside', checkLoggedIn, carEntryController.getAllCarsInside);

export default carEntryRouter;
