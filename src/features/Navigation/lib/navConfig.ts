import { Home, QuranSearch, Settings } from 'features';
import { HomeOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { ROUTE } from 'shared/lib/constants';

export const tabItems = [
  {
    id: 'home',
    label: 'Главная',
    icon: HomeOutlined,
    url: ROUTE.HOME,
    component: Home,
    
    props: {}, 
  },
  {
    id: 'search',
    label: 'Коран',
    icon: SearchOutlined,
    url: ROUTE.SEARCH,
    component: QuranSearch,
    props: {}, 
  },
  {
    id: 'settings',
    label: 'Настройки',
    icon: SettingOutlined,
    url: ROUTE.SETTINGS,
    component: Settings,
    props: {}, 
  },
];