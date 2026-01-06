import { useLanguage } from "../contexts/LanguageContext";

export default function TestPage() {
  const { lang, language } = useLanguage();

  return (
    <div>
      <h1>Language test</h1>
      <p>Lang code: {lang}</p>
      <p>Label: {language.label}</p>
    </div>
  );
}
