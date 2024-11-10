import styles from "./Card.module.css";
import CardImage from "./card-image/CardImage";
import CardHeader from "./card-header/CardHeader";
import CardContent from "./card-content/CardContent";
import CardFooter from "./card-footer/CardFooter";
import Card from "./card/card";
import { useEffect, useReducer, useState } from "react";
import AddCountryForm from "./add-country-form/add-country";
import { countriesReducer } from "./reducer/reducer";
import { useParams, useSearchParams } from "react-router-dom";
import ConfirmationModal from "./delete-Confirm/ConfirmationModal";
import CardEdit from "./edit-card-form/edit-card";
import {
  createCountry,
  deleteCountry,
  getCountriesData,
  getSortedCountriesData,
  updateCountry,
} from "@/api/countries";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Country } from "@/types";
import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortType, setSortType] = useState(
    searchParams.get("_sort") || "likes",
  );

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

  const queryClient = useQueryClient();

  useEffect(() => {
    if (countries) {
      dispatch({ type: "initialize", payload: { countries: countries } });
    }
  }, [countries]);

  const { mutate: updateLikes } = useMutation({ mutationFn: updateCountry });

  const handleLikeUp = (id: string, currentLikes: number) => () => {
    dispatch({ type: "like", payload: { id } });
    updateLikes({ id, payload: { like: currentLikes + 1 } });
  };

  console.log(sortType);
  const handleSortByLikes = async (sortType: "asc" | "desc") => {
    try {
      const newSort = sortType === "asc" ? "like" : "-like";
      setSortType(newSort);
      const sortedData = await getSortedCountriesData(newSort, sortType);
      console.log(sortedData);
      dispatch({ type: "sort", payload: { sortedData } });
      setSearchParams({ _sort: newSort });
      refetchCountries(); // Refetch data based on the new sort type
    } catch (error) {
      console.log(error);
    }
  };

  console.log(searchParams.get("_sort"));
  const { mutate: createNewCountry } = useMutation({
    mutationFn: createCountry,
    onSuccess: (data) => {
      refetchCountries();
      dispatch({
        type: "create",
        payload: { countryFields: data },
      });

      setIsEditing(false);
      setCountryIdToEdit(null);
    },
    onError: (error) => {
      console.error("Error creating country:", error);
    },
  });

  const handleCreateCountry = async (countryFields: CountryFields) => {
    await createNewCountry(countryFields);
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
          queryClient.invalidateQueries();
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
  const { mutate: removeCountry } = useMutation({
    mutationFn: deleteCountry,
    onSuccess: () => {
      dispatch({ type: "delete", payload: { id: countryIdToDelete } });
      queryClient.invalidateQueries();
      setIsModalOpen(false);
      setCountryIdToDelete(null);
    },
    onError: (error) => {
      console.error("Failed to delete country:", error);
    },
  });

  const confirmDelete = () => {
    if (countryIdToDelete) {
      removeCountry(countryIdToDelete);
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

  const parentRef = React.useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: countriesData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  return (
    <div>
      <div className={styles.manageCards}>
        <div className={styles.sortButton}>
          <button onClick={async () => handleSortByLikes("asc")}>
            ⬆️ Sort Asc
          </button>
          <button onClick={async () => handleSortByLikes("desc")}>
            ⬇️ Sort Desc
          </button>
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

      <div
        ref={parentRef}
        className="List"
        style={{
          height: `400px`,
          width: `100%`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            return (
              <div
                key={virtualRow.index}
                className={
                  virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"
                }
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className={styles.cardContainer}>
                  {countriesList.map((country: Country) => (
                    <Card
                      key={country.id}
                      id={country.id}
                      deleted={country.deleted}
                    >
                      <CardImage
                        src={country.imageSrc}
                        alt={country.nameKa || country.nameEn}
                      />
                      <div className={styles.cardText}>
                        <CardHeader
                          onLike={handleLikeUp(country.id, country.like)}
                          likeCount={country.like}
                          name={lang === "ka" ? country.nameKa : country.nameEn}
                        />
                        <CardContent
                          population={country.population}
                          capital={
                            lang === "ka"
                              ? country.capitalKa
                              : country.capitalEn
                          }
                        />
                        <CardFooter
                          onDeleteCountry={() =>
                            handleDeleteCountry(country.id)
                          }
                          onEditCountry={() => getEditCountry(country.id)}
                        />
                      </div>
                    </Card>
                  ))}
                </div>{" "}
              </div>
            );
          })}
        </div>
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
