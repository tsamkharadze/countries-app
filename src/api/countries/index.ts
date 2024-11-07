import { Country } from "@/types";
import { httpClient } from "..";

// interface Country {
//   id: string;
//   nameKa: string;
//   nameEn: string;
//   capitalKa: string;
//   capitalEn: string;
//   population: number;
//   imageSrc: string;
//   like: number;
//   deleted?: boolean;
//   isEditting?: boolean;
//   initialIndex?: number;
// }

export const getCountriesData = async (): Promise<Country[]> => {
  try {
    const response = await httpClient.get<Country[]>("/countries");
    return response.data;
  } catch (error) {
    console.error("Error fetching countries data:", error);
    throw new Error("Failed to fetch countries data.");
  }
};

export const updateCountry = async ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<Country>;
}): Promise<Country> => {
  try {
    const response = await httpClient.patch<Country>(
      `/countries/${id}`,
      payload,
    );
    return response.data; // The Country object is returned
  } catch (error) {
    console.error(`Error updating country with ID ${id}:`, error);
    throw new Error("Failed to update country.");
  }
};

export const createCountry = async (payload: Country): Promise<Country> => {
  try {
    const response = await httpClient.post<Country>("/countries", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating country:", error);
    throw new Error("Failed to create country.");
  }
};

export const deleteCountry = async (id: string): Promise<void> => {
  try {
    const response = await httpClient.delete<void>(`/countries/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting country with ID ${id}:`, error);
    throw new Error("Failed to delete country.");
  }
};
