type countriesReducerInitialState = {
  imageSrc: string;
  name: string;
  capital: string;
  population: number;
  id: string;
  like: number;
}[];

type countriesReducerAction = {
  type: "like" | "sort" | "create" | "delete";
  payload: any;
};
export const countriesReducer = (
  countriesList: countriesReducerInitialState,
  action: countriesReducerAction
) => {
  if (action.type === "like") {
    const updatedCountriesList = countriesList.map((country) => {
      if (country.id === action.payload) {
        return { ...country, like: country.like + 1 };
      }
      return { ...country };
    });

    return updatedCountriesList;
  }
  if (action.type === "sort") {
    const sortedCountriesList = [...countriesList];
    if (action.payload.sortType === "asc") {
      sortedCountriesList.sort((a, b) => a.like - b.like);
      return sortedCountriesList;
    }
    if (action.payload.sortType === "desc") {
      sortedCountriesList.sort((a, b) => b.like - a.like);
      return sortedCountriesList;
    }
  }
  if (action.type === "create") {
    const changedCountriesList = [
      ...countriesList,
      {
        ...action.payload.countryFields,
        imageSrc:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/1599px-Flag_of_Georgia.svg.png?20231228212034",
        like: 0,
        id: (Number(countriesList.at(-1)?.id) + 1).toString(),
      },
    ];
    return changedCountriesList;
  }
  if (action.type === "delete") {
    const filteredCountryList = countriesList.filter((country) => {
      return country.id !== action.payload.id;
    });
    return filteredCountryList;
  }
  return countriesList;
};
