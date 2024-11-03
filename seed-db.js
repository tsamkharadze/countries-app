import fs from "fs";
import axios from "axios";

const COUNTRIES_API_URL = "https://restcountries.com/v3.1/all";
const MY_MEMORY_URL = "https://api.mymemory.translated.net/get";

const translateText = async (text, toLang) => {
  try {
    const response = await axios.get(MY_MEMORY_URL, {
      params: {
        q: text,
        langpair: `en|${toLang}`,
      },
    });
    return response.data.responseData.translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    return text;
  }
};

// Main function to seed the database
const seedDatabase = async () => {
  try {
    const response = await axios.get(COUNTRIES_API_URL);
    const countriesData = response.data;

    const processedCountries = await Promise.all(
      countriesData.map(async (country) => {
        const nameKa = await translateText(country.name.common, "ka");
        const capitalKa = await translateText(country.capital?.[0] || "", "ka");

        return {
          id: country.cca3,
          imageSrc: country.flags?.png || "",
          nameKa,
          nameEn: country.name.common,
          capitalKa,
          capitalEn: country.capital?.[0] || "",
          population: country.population,
          like: 0, // Default value for likes
          deleted: false, // Default value for deleted
        };
      }),
    );

    fs.writeFileSync(
      "db.json",
      JSON.stringify({ countries: processedCountries }, null, 2),
    );
    console.log("DONE");
  } catch (error) {
    console.error("Error", error);
  }
};

// Run the seed function
seedDatabase();
