import {create} from 'zustand';
import i18n from '../i18n';

const useLanguageStore = create((set) => ({
  language: i18n.language,
  setLanguage: (lng) => {
    i18n.changeLanguage(lng);
    set({ language: lng });
  },
}));

export default useLanguageStore;