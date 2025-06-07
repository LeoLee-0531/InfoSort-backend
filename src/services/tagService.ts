import prisma from '../prisma/client';
import { TagInput } from '../types';

export const tagService = {
  // 獲取所有標籤 (屬於特定使用者)
  getAllTags: async (userId: string) => {
    return prisma.tag.findMany({
      where: { userId }
    });
  },

  // 根據 ID 獲取標籤 (屬於特定使用者)
  getTagById: async (id: string, userId: string) => {
    const tag = await prisma.tag.findUnique({
      where: { id },
      include: {
        itemAssociations: {
          include: {
            item: true
          }
        }
      }
    });
    if (tag && tag.userId === userId) {
      return tag;
    }
    return null;
  },

  // 根據名稱獲取標籤 (名稱是全域唯一的，但我們也檢查是否屬於特定使用者)
  getTagByName: async (name: string, userId: string) => {
    const tag = await prisma.tag.findUnique({
      where: { name }
    });
    // If the desire is to find a tag by name *only if* it belongs to the user:
    if (tag && tag.userId === userId) {
      return tag;
    }
    // If the desire is to know if a name is taken globally, irrespective of user for creation purposes, 
    // the controller might call a simpler version or just use this and check the result.
    // For now, this returns the tag only if it matches the name AND the userId.
    return null; 
  },

  // For checking if a tag name exists globally (used by controller before creation)
  checkTagExistsByNameGlobal: async (name: string) => {
    return prisma.tag.findUnique({
      where: { name }
    });
  },

  // 創建新標籤
  createTag: async (data: TagInput) => {
    return prisma.tag.create({
      data
    });
  },

  // 更新標籤 (確保標籤屬於該使用者)
  updateTag: async (id: string, data: Partial<Omit<TagInput, 'userId'>>, userId: string) => {
    const tag = await prisma.tag.findUnique({
      where: { id }
    });

    if (!tag || tag.userId !== userId) {
      return null; // Not found or not authorized
    }

    // If name is being updated, it must not conflict with an existing global name
    // This check should ideally be in the controller or a more specific service method
    if (data.name && data.name !== tag.name) {
        const existingByName = await prisma.tag.findUnique({ where: { name: data.name } });
        if (existingByName && existingByName.id !== id) {
            // This name is taken by another tag globally
            throw new Error('Tag name already exists globally'); // Or return a specific error code/object
        }
    }

    return prisma.tag.update({
      where: { id }, // id is unique
      data
    });
  },

  // 刪除標籤 (確保標籤屬於該使用者)
  deleteTag: async (id: string, userId: string) => {
    const tag = await prisma.tag.findUnique({
      where: { id }
    });

    if (!tag || tag.userId !== userId) {
      return null; // Not found or not authorized
    }

    return prisma.tag.delete({
      where: { id } // id is unique
    });
  }
};