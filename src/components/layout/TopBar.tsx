import { useLanguage } from '../../context/LanguageContext';

export default function TopBar() {
  const { t } = useLanguage();
  return <div className="top-bar">{t.topBar}</div>;
}
