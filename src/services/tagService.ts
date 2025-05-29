import prisma from '../prisma/client';
import { TagInput } from '../types';

export const tagService = {
  // 獲取所有標籤
  getAllTags: async () => {
    return prisma.tag.findMany();
  },

  // 根據 ID 獲取標籤
  getTagById: async (id: string) => {
    return prisma.tag.findUnique({
      where: { id },
      include: {
        itemAssociations: {
          include: {
            item: true
          }
        }
      }
    });
  },

  // 根據名稱獲取標籤
  getTagByName: async (name: string) => {
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

  // 更新標籤
  updateTag: async (id: string, data: Partial<TagInput>) => {
    return prisma.tag.update({
      where: { id },
      data
    });
  },

  // 刪除標籤
  deleteTag: async (id: string) => {
    return prisma.tag.delete({
      where: { id }
    });
  }
};