import { Country, CountryResponse } from "@/types";
import { httpClient } from "..";

export const getCountriesData = async (): Promise<Country[]> => {
  try {
    const response = await httpClient.get<Country[]>(`/countries`);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries data:", error);
    throw new Error("Failed to fetch countries data.");
  }
};

export const getFetchedCountriesData = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<CountryResponse> => {
  try {
    const response = await httpClient.get<{ data: Country[]; next: number }>(
      `/countries?_page=${page}&_per_page=${limit}`,
    );
    console.log(response);

    return {
      data: response.data.data,
      nextOffset: response.data.next,
    };
  } catch (error) {
    console.error("Error fetching countries data:", error);
    throw new Error("Failed to fetch countries data.");
  }
};

export const getSingleCountryData = async (id: string): Promise<Country> => {
  try {
    const response = await httpClient.get<Country>(`/countries/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries data:", error);
    throw new Error("Failed to fetch countries data.");
  }
};

export const getSortedCountriesData = async (
  name: string,
  type: string,
): Promise<Country[]> => {
  try {
    const response = await httpClient.get<Country[]>(
      `/countries?_sort=${name}&order=${type}`,
    );
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
