import { PrismaClient, User } from '@prisma/client';
import { HttpError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const createUserService = async (lineUserId: string): Promise<User> => {
  const existingUser = await prisma.user.findUnique({
    where: { lineUserId },
  });
  if (existingUser) {
    throw new HttpError(409, `User with lineUserId '${lineUserId}' already exists.`);
  }
  return prisma.user.create({
    data: {
      lineUserId,
    },
  });
};

export const getAllUsersService = async (): Promise<User[]> => {
  return prisma.user.findMany({
    include: {
      informationItems: true, // Include related information items
    },
  });
};

export const getUserByLineUserIdService = async (lineUserId: string): Promise<User | null> => {
  try {
    if (!lineUserId || typeof lineUserId !== 'string' || lineUserId.trim() === '') {
      throw new HttpError(400, 'LINE User ID 必須為有效的非空字串');
    }

    const user = await prisma.user.findUnique({
      where: { lineUserId: lineUserId.trim() },
      include: {
        informationItems: true, // Include related information items
      },
    });
    
    if (!user) {
      throw new HttpError(404, `User with lineUserId '${lineUserId}' not found.`);
    }
    
    return user;
  } catch (error) {
    console.error('getUserByLineUserIdService error:', error);
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError(500, 'Database error occurred while fetching user');
  }
};

// Update service might not be strictly necessary if only lineUserId and createdAt exist
// and createdAt is auto-generated. However, if other fields are added later,
// this structure can be expanded.
// For now, an update operation on a User might not make sense if only lineUserId is mutable
// and it's the ID. If other mutable fields are added, this can be implemented.
/*
export const updateUserService = async (lineUserId: string, data: Partial<Omit<User, 'lineUserId' | 'createdAt'>>): Promise<User | null> => {
  const user = await prisma.user.update({
    where: { lineUserId },
    data,
  });
  if (!user) {
    throw new HttpError(404, `User with lineUserId '${lineUserId}' not found for update.`);
  }
  return user;
};
*/

export const deleteUserService = async (lineUserId: string): Promise<User | null> => {
  // Consider implications of deleting a user, e.g., cascading deletes for InformationItems
  // Prisma schema does not specify onDelete behavior for User -> InformationItem relation from User side.
  // By default, Prisma prevents deletion if related records exist.
  // Handle this by either deleting related items first or adjusting schema.
  // For now, we assume related items should not block deletion or are handled by DB/Prisma settings.

  const informationItems = await prisma.informationItem.findMany({
    where: { userId: lineUserId },
  });

  if (informationItems.length > 0) {
    // Option 1: Delete associated InformationItems
    // await prisma.informationItem.deleteMany({
    //   where: { userId: lineUserId },
    // });

    // Option 2: Throw an error or handle as per application logic
    throw new HttpError(409, `User '${lineUserId}' cannot be deleted as they have associated information items. Please delete them first.`);
  }

  const user = await prisma.user.delete({
    where: { lineUserId },
  });
  // No need to check if (!user) because Prisma throws P2025 if record to delete is not found.
  return user;
};
