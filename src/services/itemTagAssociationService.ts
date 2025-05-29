import prisma from '../prisma/client';
import { ItemTagAssociationInput } from '../types';

export const itemTagAssociationService = {
  // 為資訊項目添加標籤
  addTagToItem: async (data: ItemTagAssociationInput) => {
    return prisma.itemTagAssociation.create({
      data,
      include: {
        item: true,
        tag: true
      }
    });
  },

  // 從資訊項目中移除標籤
  removeTagFromItem: async (itemId: string, tagId: string) => {
    return prisma.itemTagAssociation.deleteMany({
      where: {
        itemId,
        tagId
      }
    });
  },

  // 獲取資訊項目的所有標籤
  getTagsForItem: async (itemId: string) => {
    const associations = await prisma.itemTagAssociation.findMany({
      where: { itemId },
      include: { tag: true }
    });
    return associations.map(assoc => assoc.tag);
  },

  // 獲取帶有特定標籤的所有資訊項目
  getItemsWithTag: async (tagId: string) => {
    const associations = await prisma.itemTagAssociation.findMany({
      where: { tagId },
      include: { item: true }
    });
    return associations.map(assoc => assoc.item);
  }
};