import './styles/global.scss'

import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { ConfigProvider } from 'antd';
import 'app/styles/global.scss'
import ruRU from 'antd/locale/ru_RU'
import { store } from './store/store.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';

createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <ConfigProvider locale={ruRU}>
      <RouterProvider router={router} />
    </ConfigProvider>

  </Provider>

)
{/* <RouterProvider router={router}  /> */ }