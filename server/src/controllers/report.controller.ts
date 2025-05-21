import { Request, Response } from 'express';
import prisma from '../../prisma/prisma-client';
import ServerResponse from '../utils/ServerResponse';

const getOutgoingCarsReport = async (req: Request, res: Response) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return ServerResponse.error(res, 'Start and end date-times are required');
    }

    const startDate = new Date(start as string);
    const endDate = new Date(end as string);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return ServerResponse.error(res, 'Invalid date-time format');
    }

    const cars = await prisma.carEntry.findMany({
      where: {
        exitDateTime: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        exitDateTime: 'asc',
      },
    });

    const total = cars.reduce((acc, c) => acc + (c.chargedAmount || 0), 0);
    return ServerResponse.success(res, 'Outgoing cars report', { total, cars });
  } catch (err) {
    console.error(err);
    return ServerResponse.error(res, 'Failed to generate outgoing cars report');
  }
};

const getEnteredCarsReport = async (req: Request, res: Response) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return ServerResponse.error(res, 'Start and end date-times are required');
    }

    const startDate = new Date(start as string);
    const endDate = new Date(end as string);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return ServerResponse.error(res, 'Invalid date-time format');
    }

    const cars = await prisma.carEntry.findMany({
      where: {
        entryDateTime: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        entryDateTime: 'asc',
      },
    });

    return ServerResponse.success(res, 'Entered cars report', { count: cars.length, cars });
  } catch (err) {
    console.error(err);
    return ServerResponse.error(res, 'Failed to generate entered cars report');
  }
};

const reportController = {
  getOutgoingCarsReport,
  getEnteredCarsReport,
};
  
export default reportController;
