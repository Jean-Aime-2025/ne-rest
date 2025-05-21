import { hashSync } from 'bcrypt';
import { config } from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/prisma-client';
import { AuthRequest } from '../types';
import ServerResponse from '../utils/ServerResponse';

config();

const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log('body', req.body);
    const hashedPassword = hashSync(password, 10);
    console.log('hashedPassword', hashedPassword);
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '3d' }
    );
    return ServerResponse.created(res, 'User created successfully', {
      user,
      token,
    });
  } catch (error: any) {
    console.log('error', error);
    if (error.code === 'P2002') {
      const key = error.meta.target[0];
      return ServerResponse.error(
        res,
        `${key.charAt(0).toUpperCase() + key.slice(1)} (${
          req.body[key]
        }) already exists`,
        400
      );
    }
    return ServerResponse.error(res, 'Error occured', { error });
  }
};

const updateUser: any = async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        firstName,
        lastName,
        email,
      },
    });
    return ServerResponse.success(res, 'User updated successfully', { user });
  } catch (error: any) {
    if (error.code === 'P2002') {
      const key = error.meta.target[0];
      return ServerResponse.error(
        res,
        `${key.charAt(0).toUpperCase() + key.slice(1)} (${
          req.body[key]
        }) already exists`,
        400
      );
    }
    return ServerResponse.error(res, 'Error occured', { error });
  }
};

const me: any = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    return ServerResponse.success(res, 'User fetched successfully', { user });
  } catch (error) {
    return ServerResponse.error(res, 'Error occured', { error });
  }
};

const all = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({});
    return ServerResponse.success(res, 'User updated successfully', { users });
  } catch (error) {
    return ServerResponse.error(res, 'Error occured', { error });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    return ServerResponse.success(res, 'User fetched successfully', { user });
  } catch (error) {
    return ServerResponse.error(res, 'Error occured', { error });
  }
};

const deleteUser: any = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.delete({ where: { id: req.user.id } });
    return ServerResponse.success(res, 'User deleted successfully', { user });
  } catch (error) {
    return ServerResponse.error(res, 'Error occured', { error });
  }
};

const deleteById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.delete({ where: { id: req.params.id } });
    return ServerResponse.success(res, 'User deleted successfully', { user });
  } catch (error) {
    return ServerResponse.error(res, 'Error occured', { error });
  }
};

const userController = {
  createUser,
  updateUser,
  me,
  all,
  getById,
  deleteUser,
  deleteById,
};

export default userController;
