import { Country } from "@/types";

type CountryFields = {
  id: string;
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
type EditAction = {
  type: "edit";
  payload: { countryFields: CountryFields };
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
type InitializeAction = {
  type: "initialize";
  payload: {
    countries: Country[];
  };
};

// Combine all action types into a union type
type countriesReducerAction =
  | LikeAction
  | SortAction
  | CreateAction
  | EditAction
  | DeleteAction
  | RestoreAction
  | InitializeAction;

// type Country = {
//   imageSrc: string;
//   nameKa: string;
//   nameEn: string;
//   capitalKa: string;
//   capitalEn: string;
//   population: number;
//   id: string;
//   like: number;
//   deleted: boolean; // Ensure this is present and not optional
//   initialIndex?: number; // Optional if it is not always present
// };

type countriesReducerInitialState = Country[];

export const countriesReducer = (
  countriesList: countriesReducerInitialState,
  action: countriesReducerAction,
): countriesReducerInitialState => {
  switch (action.type) {
    case "initialize":
      return action.payload.countries;

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

    case "create": {
      const newCountriesList = [
        ...countriesList,
        {
          ...action.payload.countryFields,
          like: 0,
          id: action.payload.countryFields.id,
          deleted: false,
          initialIndex: countriesList.length,
        },
      ];
      console.log(newCountriesList); // Log new state after creation
      return newCountriesList;
    }

    case "edit": {
      return countriesList.map((country) =>
        country.id === action.payload.countryFields?.id
          ? {
              ...country,
              ...action.payload.countryFields,
            }
          : country,
      );
    }
    case "delete":
      return countriesList.filter(
        (country) => country.id !== action.payload.id,
      );

    default:
      return countriesList;
  }
};
