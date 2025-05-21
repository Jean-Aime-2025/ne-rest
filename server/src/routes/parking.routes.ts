import { Router } from 'express';
import { CreateParkingDto } from '../dtos/parking.dto';
import { checkAdmin, checkLoggedIn } from '../middlewares/auth.middleware';
import { validationMiddleware } from '../middlewares/validator.middleware';
import parkingController from '../controllers/parking.controller';

const parkingRouter = Router();

parkingRouter.post('/', checkLoggedIn, checkAdmin, validationMiddleware(CreateParkingDto), parkingController.createParking);
parkingRouter.get('/', checkLoggedIn, parkingController.getAllAvailableParkings);

export default parkingRouter;
