import { useParams } from "react-router-dom";

const ContinentsInfo = () => {
  const { lang } = useParams<{ lang: "ka" | "en" }>();
  const currentLang = lang || "en";
  return (
    <div>
      {currentLang === "ka"
        ? "ეს არის კონტინენტების სექცია"
        : "this is a Continents Section"}
    </div>
  );
};

export default ContinentsInfo;
