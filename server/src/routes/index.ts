import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import parkingRouter from "./parking.routes";
import carEntryRouter from "./carEntry.routes";
import reportRouter from "./report.routes";

const router = Router()

router.use("/auth", authRouter
    /*
        #swagger.tags = ['Auth']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)
router.use("/user", userRouter
    /*
        #swagger.tags = ['Users']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)
router.use("/parking", parkingRouter
    /*
        #swagger.tags = ['Parkings']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)
router.use("/car-action", carEntryRouter
    /*
        #swagger.tags = ['Car Entries']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)
router.use("/reports", reportRouter
    /*
        #swagger.tags = ['Reports']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)
export default router