export interface BaseProduct {
  id: string;
  label: string;
  type: 'digital' | 'physical';
  id_category: string;
  created_at: Date;
  updated_at: Date;
}

export interface DigitalProduct extends BaseProduct {
  type: 'digital';
  download_url: string;
}

export interface PhysicalProduct extends BaseProduct {
  type: 'physical';
  weight: number;
}

export type Product = DigitalProduct | PhysicalProduct;
