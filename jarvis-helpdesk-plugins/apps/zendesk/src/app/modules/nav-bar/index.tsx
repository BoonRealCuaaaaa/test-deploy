import { useI18n } from '@/shared/hooks/use-i18n';

const NavBar = () => {
  const { t } = useI18n();
  return <div className="text-xl font-bold">{t('nav_bar.hello')}</div>;
};

export default NavBar;
