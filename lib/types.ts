export interface Province {
    id: number;
    name_th: string;
    name_en: string;
    zip_code?: string;
}

export interface Region {
    id: string;
    name: string;
}

export interface Attraction {
    id: number;
    name: string;
    region: string;
    province: string;
    description: string;
    imageUrl: string;
    mapUrl: string;
}
