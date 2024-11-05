import { httpClient } from "..";

export const getCountriesData = () => {
  return httpClient.get("/countries").then((response) => response.data);
};

export const updateCountry = ({ id, payload }: { id: any; payload: any }) => {
  return httpClient
    .patch(`/countries/${id}`, payload)
    .then((response) => response.data);
};

export const createCountry = (payload: any) => {
  return httpClient
    .post("/countries", payload) // POST to the base URL
    .then((response) => response.data);
};

export const deleteCountry = (id: any) => {
  return httpClient
    .delete(`/countries/${id}`)
    .then((response) => response.data);
};
