
export interface ProductWithImage {
    imageUrl: string | null;
    id: number;
    name: string | null;
    price: number | null;
    createdAt: Date;
    updatedAt: Date | null;
}

export interface Guest {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    children_quantity: number;
    adults_quantity: number;
    confirmation: boolean;
    email: string | null;
    phone: number | null;
    guestCompanions: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date | null;
        guest_id: number;
    }[]
}