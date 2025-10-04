import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Update document direction for RTL support
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  return (
    <div className="flex space-x-2 rtl:space-x-reverse">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          i18n.language === 'en'
            ? 'bg-blue-500 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {t('language.english')}
      </button>
      <button
        onClick={() => changeLanguage('ar')}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          i18n.language === 'ar'
            ? 'bg-blue-500 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {t('language.arabic')}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
