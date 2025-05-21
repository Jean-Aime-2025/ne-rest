import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
  });

  if (existingAdmin) {
    console.log('Admin user already exists.');
  } else {
    const hashedAdminPassword = await bcrypt.hash('Admin@123', 10);

    const admin = await prisma.user.create({
      data: {
        firstName: 'Super',
        lastName: 'Admin',
        email: 'admin@example.com',
        password: hashedAdminPassword,
        role: 'ADMIN',
      },
    });

    console.log('Admin user created:', admin.email);
  }

  // Create multiple attendants
  const usersData = [
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice@example.com',
      password: 'User@123',
    },
    {
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bob@example.com',
      password: 'User@123',
    },
    {
      firstName: 'Charlie',
      lastName: 'Davis',
      email: 'charlie@example.com',
      password: 'User@123',
    },
  ];

  for (const userData of usersData) {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = await prisma.user.create({
        data: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: hashedPassword,
          role: 'ATTENDANT',
        },
      });
      console.log('Attendant user created:', newUser.email);
    } else {
      console.log(`User with email ${userData.email} already exists.`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
