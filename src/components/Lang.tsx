import Button from './Button';

import i18n from "../utils/translation";

export default function Lang() {
    const toggleLanguage = () => {
        const newLang = i18n.language === "fr" ? "en" : "fr";
        i18n.changeLanguage(newLang);
    };

    const nextLangLabel = i18n.language === "fr" ? "EN" : "FR";

    return (
        <Button
            onClick={toggleLanguage}
            label={`Lang: ${nextLangLabel}`}
            variant="icon"
        >
            {nextLangLabel}
        </Button>
    )
}