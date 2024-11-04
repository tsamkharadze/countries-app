import { httpClient } from "..";

export const getCountriesData = () => {
  return httpClient.get("/countries").then((response) => response.data);
};
