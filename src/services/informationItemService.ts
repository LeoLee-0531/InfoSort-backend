import prisma from '../prisma/client';
import { InformationItemInput } from '../types';

export const informationItemService = {
  // 獲取所有資訊項目
  getAllItems: async (userId: string) => {
    const filter = { userId };
    return prisma.informationItem.findMany({
      where: filter,
      select: {
        id: true,
        title: true,
        description: true, // Added description field
        type: true,
        originalContent: true, // Corresponds to original_content
        userId: true,          // Corresponds to user_id
        tags: true,            // Added tags field
        createdAt: true,       // Corresponds to created_at
        updatedAt: true,       // Corresponds to updated_at
        tagAssociations: {
          include: {
            tag: true
          }
        }
      }
    });
  },
  
  // 根據 ID 獲取資訊項目
  getItemById: async (id: string) => {
    return prisma.informationItem.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true, // Added description field
        type: true,
        originalContent: true, // Corresponds to original_content
        userId: true,          // Corresponds to user_id
        tags: true,            // Added tags field
        createdAt: true,       // Corresponds to created_at
        updatedAt: true,       // Corresponds to updated_at
        tagAssociations: {
          include: {
            tag: true
          }
        }
      }
    });
  },

  // 創建新的資訊項目
  createItem: async (data: InformationItemInput) => {
    return prisma.informationItem.create({
      data
    });
  },

  // 更新資訊項目
  updateItem: async (id: string, data: Partial<InformationItemInput>) => {
    return prisma.informationItem.update({
      where: { id },
      data
    });
  },

  // 刪除資訊項目
  deleteItem: async (id: string) => {
    return prisma.informationItem.delete({
      where: { id }
    });
  },

  // 根據類型獲取資訊項目
  getItemsByType: async (type: string, userId?: string) => {
    const filter = userId ? { type, userId } : { type };
    return prisma.informationItem.findMany({
      where: filter,
      select: {
        id: true,
        title: true,
        description: true, // Added description field
        type: true,
        originalContent: true, // Corresponds to original_content
        userId: true,          // Corresponds to user_id
        tags: true,            // Added tags field
        createdAt: true,       // Corresponds to created_at
        updatedAt: true,       // Corresponds to updated_at
        tagAssociations: {
          include: {
            tag: true
          }
        }
      }
    });
  }
};