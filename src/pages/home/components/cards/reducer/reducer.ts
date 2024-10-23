type countriesReducerInitialState = {
  imageSrc: string;
  nameEn: string;
  capital: string;
  population: number;
  id: string;
  like: number;
  deleted?: boolean;
  initialIndex?: number;
}[];

type countriesReducerAction = {
  type: "like" | "sort" | "create" | "delete" | "restore";
  payload: any;
};
export const countriesReducer = (
  countriesList: countriesReducerInitialState,
  action: countriesReducerAction
) => {
  if (action.type === "like") {
    const updatedCountriesList = countriesList.map((country) => {
      if (country.id === action.payload.id) {
        return { ...country, like: country.like + 1 };
      }
      return { ...country };
    });

    return updatedCountriesList;
  }
  if (action.type === "sort") {
    const sortedCountriesList = [...countriesList].sort((a, b) => {
      return action.payload.sortType === "asc"
        ? a.like - b.like
        : b.like - a.like;
    });
    return sortedCountriesList;
  }
  if (action.type === "create") {
    const changedCountriesList = [
      ...countriesList,
      {
        ...action.payload.countryFields,
        nameKa: action.payload.countryFields.nameKa,
        capitalKa: action.payload.countryFields.capitalKa,
        imageSrc: action.payload.countryFields.image,

        like: 0,
        // id: (Number(countriesList.at(-1)?.id) + 1).toString(),
        id: `country-${Date.now()}-${Math.random()}`,
        deleted: false,
        initialIndex: countriesList.length + 1,
      },
    ];

    console.log(changedCountriesList);
    return changedCountriesList;
  }
  if (action.type === "delete") {
    const countryIndex = countriesList.findIndex(
      (country) => country.id === action.payload.id
    );

    const updatedCountriesList = [
      ...countriesList.slice(0, countryIndex),
      ...countriesList.slice(countryIndex + 1),
      {
        ...countriesList[countryIndex],
        deleted: true,
        initialIndex: countryIndex,
      },
    ];

    console.log(updatedCountriesList);
    return updatedCountriesList;
  }

  if (action.type === "restore") {
    const countryToRestore = countriesList.find(
      (country) => country.id === action.payload.id && country.deleted
    );

    if (countryToRestore && countryToRestore.initialIndex !== undefined) {
      const updatedCountriesList = [...countriesList];
      const index = updatedCountriesList.indexOf(countryToRestore);

      updatedCountriesList.splice(index, 1);

      updatedCountriesList.splice(countryToRestore.initialIndex, 0, {
        ...countryToRestore,
        deleted: false, // Restore the country
      });

      return updatedCountriesList;
    }
  }

  return countriesList;
};
