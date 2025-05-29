export interface InformationItemInput {
  userId: string;
  type: string;
  originalContent: string;
  title?: string;
}

export interface TagInput {
  name: string;
  description?: string;
}

export interface ItemTagAssociationInput {
  itemId: string;
  tagId: string;
}