import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import fr from '../locales/fr.json';

const resources = { en: { translation: en }, fr: { translation: fr } };

const userLang = navigator.language.startsWith('fr') ? 'fr' : 'en';

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: userLang,
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    })
;

document.documentElement.lang = i18n.language;

export default i18n;