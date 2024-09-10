import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationVI from "./locales/vn/translation.json";

const resources = {
    en: { translation: translationEN },
    vi: { translation: translationVI }
};

i18n.use(initReactI18next).init({
    resources,
    lng: "vi", // Ngôn ngữ mặc định
    interpolation: { escapeValue: false }
});

export default i18n;
