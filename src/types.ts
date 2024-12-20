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

export interface CountryResponse {
  data: Country[];
  nextOffset: number | null;
}
