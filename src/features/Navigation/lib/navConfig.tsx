import { House, Search, FolderHeart, Settings, Book, } from 'lucide-react'
import {  QuranSearch, Settings as SettingI } from 'features'
import {
  HomeOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { ROUTE } from 'shared/lib/constants'
import { HomePage } from 'pages'

export const navItems = [
  { path: ROUTE.HOME, icon: <House size={18} />, label: 'Главная' },
  { path: ROUTE.SEARCH, icon: <Search size={18} />, label: 'Поиск' },
  // { path: ROUTE.BOOKMARK, icon: <FolderHeart size={18} />, label: 'Избранное' },
  { path: ROUTE.READER, icon: <Book size={18} />, label: 'Чтение' },
  { path: ROUTE.SETTINGS, icon: <Settings size={18} />, label: 'Настройки' },
]

export const tabItems = [
  {
    id: 'home',
    label: 'Главная',
    icon: HomeOutlined,
    url: ROUTE.HOME,
    component: HomePage,

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
    component: SettingI,
    props: {},
  },
]
