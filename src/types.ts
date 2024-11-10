//API

export interface Country {
  id: string;
  nameKa: string;
  nameEn: string;
  capitalKa: string;
  capitalEn: string;
  population: number;
  imageSrc: string;
  like: number;
  deleted?: boolean;
  isEditting?: boolean;
  initialIndex?: number;
}
interface PaginationMeta {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
}

export interface CountryResponse {
  data: Country[];
  pagination: PaginationMeta;
}
