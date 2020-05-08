export interface LostItem {
  id?: number;
  name: string;
  categoryId: number;
  description: string;
  userId: number;
  categoryName: string;
  foundUserName: string;
  imageUrls: Array<string>;
}
