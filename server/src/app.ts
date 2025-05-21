import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import http from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger/doc/swagger.json';
import ServerResponse from './utils/ServerResponse';
import router from './routes';
import { requestLogger } from './middlewares/log.middleware';
import logger from './utils/logger';
import path from 'path';
import fs from 'fs';
import prisma from "../prisma/prisma-client";

config();

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))
app.disable('x-powered-by');

// app.use(requestLogger);

app.use('/api/v1', router)
// @ts-ignore: Unreachable code error
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
import { generateTicketPDF } from './utils/pdfGenerator';

app.get('/api/v1/tickets/:plateNumber.pdf', async (req, res) => {
  const { plateNumber } = req.params;

  try {
    // Fetch car record by plateNumber
    const car = await prisma.carEntry.findUnique({ where: { plateNumber } });
    if (!car || !car.chargedAmount || !car.exitDateTime) {
      return res.status(404).send('Ticket PDF not found or car has not exited yet');
    }

    const chargedAmount = car.chargedAmount;
    
    const pdfBuffer = await generateTicketPDF({
      plateNumber,
      chargedAmount,
      date: car.exitDateTime.toLocaleString()
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${plateNumber}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).send('Failed to generate ticket PDF');
  }
});

// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);
//   res.status(500).json({ message: "Internal server error" });
// });


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})