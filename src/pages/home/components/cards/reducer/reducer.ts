type CountryFields = {
  imageSrc: string;
  nameKa: string;
  nameEn: string;
  capitalKa: string;
  capitalEn: string;
  population: number;
};

// Define specific types for each action
type LikeAction = {
  type: "like";
  payload: {
    id: string;
  };
};

type SortAction = {
  type: "sort";
  payload: {
    sortType: "asc" | "desc";
  };
};

type CreateAction = {
  type: "create";
  payload: {
    countryFields: CountryFields;
  };
};

type DeleteAction = {
  type: "delete";
  payload: {
    id: string;
  };
};

type RestoreAction = {
  type: "restore";
  payload: {
    id: string;
  };
};

// Combine all action types into a union type
type countriesReducerAction =
  | LikeAction
  | SortAction
  | CreateAction
  | DeleteAction
  | RestoreAction;

type Country = {
  imageSrc: string;
  nameKa: string;
  nameEn: string;
  capitalKa: string;
  capitalEn: string;
  population: number;
  id: string;
  like: number;
  deleted: boolean; // Ensure this is present and not optional
  initialIndex?: number; // Optional if it is not always present
};

type countriesReducerInitialState = Country[];

export const countriesReducer = (
  countriesList: countriesReducerInitialState,
  action: countriesReducerAction,
): countriesReducerInitialState => {
  switch (action.type) {
    case "like":
      return countriesList.map((country) =>
        country.id === action.payload.id
          ? { ...country, like: country.like + 1 }
          : country,
      );

    case "sort":
      return [...countriesList].sort((a, b) =>
        action.payload.sortType === "asc" ? a.like - b.like : b.like - a.like,
      );

    case "create":
      return [
        ...countriesList,
        {
          ...action.payload.countryFields,
          like: 0,
          id: `country-${Date.now()}-${Math.random()}`,
          deleted: false, // Ensure deleted is set to false when creating
          initialIndex: countriesList.length, // Adjust as necessary
        },
      ];

    case "delete":
      return countriesList.map((country) =>
        country.id === action.payload.id
          ? { ...country, deleted: true }
          : country,
      );

    case "restore":
      return countriesList.map((country) =>
        country.id === action.payload.id && country.deleted
          ? { ...country, deleted: false }
          : country,
      );

    default:
      return countriesList;
  }
};
