import { useParams } from "react-router-dom";

const AboutDescription = () => {
  const { lang } = useParams<{ lang: "ka" | "en" }>();
  const currentLang = lang || "en";
  return (
    <div>
      {currentLang === "ka" ? "ეს არის about სექცია" : "this is an about"}
    </div>
  );
};

export default AboutDescription;
