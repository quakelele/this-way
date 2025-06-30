import {
  House,
  Search,
  Book,
  Clock2,
} from 'lucide-react'

import { ROUTE } from 'shared/lib/constants'


export const navItems = [
  { path: ROUTE.HOME, icon: <House size={22} />, label: 'Главная' },
  { path: ROUTE.READER, icon: <Book size={22} />, label: 'Чтение' },
  { path: ROUTE.SEARCH, icon: <Search size={22} />, label: 'Поиск' },
  // { path: ROUTE.BOOKMARK, icon: <FolderHeart size={18} />, label: 'Избранное' },
  { path: ROUTE.PRAYER, icon: <Clock2 size={22} />, label: 'Время молитвы' },
]

