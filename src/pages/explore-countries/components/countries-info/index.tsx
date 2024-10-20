import { useParams } from "react-router-dom";

const CountriesInfo = () => {
  const { lang } = useParams<{ lang: "ka" | "en" }>();
  const currentLang = lang || "en";
  return (
    <div>
      {currentLang === "ka"
        ? "ეს არის ქვეყნების სექცია"
        : "this is Countries section"}
    </div>
  );
};

export default CountriesInfo;
