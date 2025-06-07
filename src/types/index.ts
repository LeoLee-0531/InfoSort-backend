export interface InformationItemInput {
  userId: string;
  type: string;
  originalContent: string;
  title?: string;
}

export interface TagInput {
  name: string;
  description?: string;
  userId: string;
}

export interface ItemTagAssociationInput {
  itemId: string;
  tagId: string;
}