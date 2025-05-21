import { Request, Response } from 'express';
import prisma from '../../prisma/prisma-client';
import ServerResponse from '../utils/ServerResponse';

const createParking = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const exists = await prisma.parking.findUnique({ where: { code: data.code } });
    if (exists) return ServerResponse.error(res, 'Parking with this code already exists');

    const parking = await prisma.parking.create({ data });
    return ServerResponse.created(res, 'Parking registered successfully', parking);
  } catch (err) {
    return ServerResponse.error(res, 'Could not create parking');
  }
};

const getAllAvailableParkings = async (_: Request, res: Response) => {
  try {
    const parkings = await prisma.parking.findMany();
    return ServerResponse.success(res, 'List of all parkings', parkings);
  } catch (err) {
    return ServerResponse.error(res, 'Error fetching parkings');
  }
};

const parkingController = {
  createParking,
  getAllAvailableParkings,
}

export default parkingController;