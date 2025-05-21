import { Router } from 'express';
import { checkAdmin } from '../middlewares/auth.middleware';
import reportController from '../controllers/report.controller';

const reportRouter = Router();

reportRouter.get('/outgoing', checkAdmin, reportController.getOutgoingCarsReport);
reportRouter.get('/entered', checkAdmin, reportController.getEnteredCarsReport);

export default reportRouter;
    