import { Home, QuranSearch, Settings } from 'features';
import { HomeOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { ROUTE } from 'shared/lib/constants';

// export const tabItems = [
//   {
//     id: 'home',
//     label: 'Главная',
//     icon: HomeOutlined,
//     url: ROUTE.HOME,
//     component: Home,
    
//     props: {}, 
//   },
//   {
//     id: 'search',
//     label: 'Коран',
//     icon: SearchOutlined,
//     url: ROUTE.SEARCH,
//     component: QuranSearch,
//     props: {}, 
//   },
//   {
//     id: 'settings',
//     label: 'Настройки',
//     icon: SettingOutlined,
//     url: ROUTE.SETTINGS,
//     component: Settings,
//     props: {}, 
//   },
// ];
export const tabItems = [
  {
    id: 'home',
    label: 'Главная',
    icon: HomeOutlined,
    path: ROUTE.HOME,
    component: Home,
    
    props: {}, 
  },
  {
    id: 'search',
    label: 'Коран',
    icon: SearchOutlined,
    path: ROUTE.SEARCH,
    component: QuranSearch,
    props: {}, 
  },
  {
    id: 'settings',
    label: 'Настройки',
    icon: SettingOutlined,
    path: ROUTE.SETTINGS,
    component: Settings,
    props: {}, 
  },
];

// const navItems = [
//   { path: ROUTE.HOME, icon: <House size={18} />, label: 'Главная' },
//   { path: ROUTE.SEARCH, icon: <Search size={18} />, label: 'Поиск' },
//   { path: ROUTE.BOOKMARK, icon: <FolderHeart size={18} />, label: 'Избранное' },
//   { path: ROUTE.SETTINGS, icon: <Settings size={18} />, label: 'Настройки' },
// ];