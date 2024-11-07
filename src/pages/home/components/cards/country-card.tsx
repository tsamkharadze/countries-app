import styles from "./Card.module.css";
import CardImage from "./card-image/CardImage";
import CardHeader from "./card-header/CardHeader";
import CardContent from "./card-content/CardContent";
import CardFooter from "./card-footer/CardFooter";
import Card from "./card/card";
import { useEffect, useReducer, useState } from "react";
import AddCountryForm from "./add-country-form/add-country";
import { countriesReducer } from "./reducer/reducer";
import { useParams } from "react-router-dom";
import ConfirmationModal from "./delete-Confirm/ConfirmationModal";
import CardEdit from "./edit-card-form/edit-card";
import {
  createCountry,
  deleteCountry,
  getCountriesData,
  updateCountry,
} from "@/api/countries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Country } from "@/types";

type CountryFields = Country;

const CountryCard: React.FC = () => {
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const { lang } = useParams<{ lang: "ka" | "en" }>();
  const [countriesList, dispatch] = useReducer(countriesReducer, countriesData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countryIdToDelete, setCountryIdToDelete] = useState<string | null>(
    null,
  );
  const [countryIdToEdit, setCountryIdToEdit] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false); // New state for managing edit/add mode

  const {
    data: countries,
    // isLoading: countriesIsLoading,
    // isError: countriesError,
    refetch: refetchCountries,
  } = useQuery({
    queryKey: ["countries-data"],
    queryFn: async () => {
      try {
        const data = await getCountriesData();
        return data;
      } catch (error) {
        console.error("Failed to fetch countries data:", error);
        throw error;
      }
    },
  });

  useEffect(() => {
    if (countries) {
      dispatch({ type: "initialize", payload: { countries: countries } });
    }
  }, [countries]);

  console.log("data", countries);
  console.log(countriesData);

  const handleLikeUp = (id: string) => () => {
    dispatch({ type: "like", payload: { id } });
  };

  const handleSortByLikes = (sortType: "asc" | "desc") => () => {
    dispatch({ type: "sort", payload: { sortType } });
  };

  const { mutateAsync: createNewCountry } = useMutation({
    mutationFn: createCountry,
  });

  const handleCreateCountry = async (countryFields: CountryFields) => {
    try {
      const data = await createNewCountry(countryFields);

      await refetchCountries();

      dispatch({
        type: "create",
        payload: { countryFields: data },
      });

      setIsEditing(false);
      setCountryIdToEdit(null);
    } catch (error) {
      console.error("Error creating country:", error);
    }
  };

  useEffect(() => {
    setCountriesData(countriesList);
  }, [countriesList]);

  const editTargetCountry = countriesData.find(
    (country) => country.id === countryIdToEdit,
  );

  const { mutate: editCountry } = useMutation({ mutationFn: updateCountry });
  const handleEditCountry = (countryFields: CountryFields) => {
    editCountry(
      { id: countryFields.id, payload: { ...countryFields } },
      {
        onSuccess: () => {
          // dispatch({ type: "edit", payload: { countryFields: response.data } });
          refetchCountries();
          setIsEditing(false);
          setCountryIdToEdit(null);
        },
        onError: (error) => {
          console.error("Failed to edit country:", error);
        },
      },
    );
  };

  const getEditCountry = (countryId: string) => {
    setCountryIdToEdit(countryId);
    setIsEditing(true);
  };

  const handleDeleteCountry = (countryId: string) => {
    setCountryIdToDelete(countryId);
    setIsModalOpen(true);
  };
  const { mutate: removeCountry } = useMutation({ mutationFn: deleteCountry });

  const confirmDelete = async () => {
    if (countryIdToDelete) {
      try {
        dispatch({ type: "delete", payload: { id: countryIdToDelete } });

        await removeCountry(countryIdToDelete);

        await refetchCountries();

        setIsModalOpen(false);
        setCountryIdToDelete(null);
      } catch (error) {
        console.error("Failed to delete country:", error);
      }
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setCountryIdToDelete(null);
  };

  const confirmationMessage =
    lang === "ka"
      ? "დარწმუნებული ხართ, რომ გსურთ country's წაშლა?"
      : "Are you sure you want to delete this country?";

  return (
    <div>
      <div className={styles.manageCards}>
        <div className={styles.sortButton}>
          <button onClick={handleSortByLikes("asc")}>⬆️ Sort Asc</button>
          <button onClick={handleSortByLikes("desc")}>⬇️ Sort Desc</button>
        </div>
        <AddCountryForm
          onCreateCountry={handleCreateCountry}
          onAdd={() => {
            setIsEditing(false);
            setCountryIdToEdit(null);
          }}
        />

        {isEditing && countryIdToEdit && editTargetCountry && (
          <CardEdit
            country={editTargetCountry}
            onUpdateCountry={handleEditCountry}
            onClose={() => {
              setIsEditing(false);
              setCountryIdToEdit(null);
            }}
          />
        )}
      </div>

      <div className={styles.cardContainer}>
        {countriesList.map((country: Country) => (
          <Card key={country.id} id={country.id} deleted={country.deleted}>
            <CardImage
              src={country.imageSrc}
              alt={country.nameKa || country.nameEn}
            />
            <div className={styles.cardText}>
              <CardHeader
                onLike={handleLikeUp(country.id)}
                likeCount={country.like}
                name={lang === "ka" ? country.nameKa : country.nameEn}
              />
              <CardContent
                population={country.population}
                capital={lang === "ka" ? country.capitalKa : country.capitalEn}
              />
              <CardFooter
                onDeleteCountry={() => handleDeleteCountry(country.id)}
                onEditCountry={() => getEditCountry(country.id)}
              />
            </div>
          </Card>
        ))}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message={confirmationMessage}
      />
    </div>
  );
};

export default CountryCard;
