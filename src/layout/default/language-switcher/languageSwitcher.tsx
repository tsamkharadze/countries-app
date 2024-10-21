import React from "react";

type LanguageSwitcherProps = {
  currentLang: "ka" | "en";
  onLanguageChange: (newLang: "ka" | "en") => void;
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const toggleLanguage = () => {
    const newLang = currentLang === "ka" ? "en" : "ka";
    onLanguageChange(newLang);
  };

  return (
    <button onClick={toggleLanguage}>
      {currentLang === "ka" ? "EN" : "KA"}
    </button>
  );
};

export default LanguageSwitcher;
