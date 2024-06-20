
export interface ProductWithImage {
    imageUrl: string | null;
    id: number;
    name: string | null;
    price: number | null;
    createdAt: Date;
    updatedAt: Date | null;
}