import { Request, Response } from 'express';
import prisma from '../../prisma/prisma-client';
import ServerResponse from '../utils/ServerResponse';
import { differenceInHours } from 'date-fns';

const registerCarEntry = async (req: Request, res: Response) => {
  try {
    const { plateNumber, parkingCode } = req.body;

    const parking = await prisma.parking.findUnique({ where: { code: parkingCode } });
    if (!parking) return ServerResponse.error(res, 'Parking not found');

    const existingCar = await prisma.carEntry.findUnique({ where: { plateNumber } });

    if (existingCar) {
      if (existingCar.status === 'IN') {
        return ServerResponse.error(res, 'Car already in parking');
      } else if (existingCar.status === 'OUT') {
        // Car had exited before, update record to mark new entry
        const updatedEntry = await prisma.carEntry.update({
          where: { plateNumber },
          data: {
            status: 'IN',
            entryDateTime: new Date(),
            exitDateTime: null,
            chargedAmount: 0,
            parkingCode,
          },
        });
        return ServerResponse.success(res, 'Car re-entered parking. Ticket updated.', updatedEntry);
      }
    }

    // No existing entry found, create a new one
    const carEntry = await prisma.carEntry.create({
      data: {
        plateNumber,
        parkingCode,
        status: 'IN',
        entryDateTime: new Date(),
        chargedAmount: 0,
      },
    });

    return ServerResponse.created(res, 'Car entry registered. Ticket generated.', carEntry);

  } catch (err) {
    console.error('Error registering car entry:', err);
    return ServerResponse.error(res, 'Error registering car entry');
  }
};

const registerCarExit = async (req: Request, res: Response) => {
  try {
    const { plateNumber } = req.params;
    const car = await prisma.carEntry.findUnique({ where: { plateNumber } });
    if (!car || car.status === 'OUT') return ServerResponse.error(res, 'Car not found or already exited');

    const parking = await prisma.parking.findUnique({ where: { code: car.parkingCode } });
    if (!parking) return ServerResponse.error(res, 'Parking not found');

    const exitDateTime = new Date();
    const duration = Math.max(differenceInHours(exitDateTime, car.entryDateTime), 1);
    const chargedAmount = duration * parking.chargePerHour;

    const updatedCar = await prisma.carEntry.update({
      where: { id: car.id },
      data: { exitDateTime, chargedAmount, status: 'OUT' }
    });

    const user = await prisma.user.findFirst({
      where: {
        email: { not: undefined }, 
      },
    });

    return ServerResponse.success(res, 'Car exited. Bill generated.', {
      chargedAmount,
      duration,
      car: updatedCar,
    });
  } catch (err) {
    return ServerResponse.error(res, 'Error processing car exit');
  }
};

const getAllCarsInside = async (_req: Request, res: Response) => {
  try {
    const carsInside = await prisma.carEntry.findMany({
      where: { status: 'IN' },
      select: {
        plateNumber: true,
        entryDateTime: true,
        parkingCode: true,
      },
    });

    return ServerResponse.success(res, 'List of cars currently inside', carsInside);
  } catch (err) {
    return ServerResponse.error(res, 'Failed to fetch cars inside');
  }
};

const carEntryController = {
  registerCarEntry,
  registerCarExit,
  getAllCarsInside
}

export default carEntryController;