import Button from '@app/components/ui/Button';

import i18n from "@app/lib/i18n";

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