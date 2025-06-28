
import App from "app/App";
import { QuranReader } from "features";

import {  BookmarkPage, HomePage, SearchPage, SettingPage } from "pages";
import { QuranReaderPage } from "pages/QuranReaderPage/QuranReaderPage";
import { createBrowserRouter } from "react-router-dom";
import { ROUTE } from "shared/lib/constants";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

      {

        path: "/",
        element: <HomePage/>,
      },
      {
        path: ROUTE.SEARCH,
        element: <SearchPage />,
      },
      {
        path: ROUTE.BOOKMARK,
        element: <BookmarkPage />,
      },
      {
        path: "/:id",
        element: <QuranReader />,
      },
      {
        path: ROUTE.SETTINGS,
        element: <SettingPage />,
      },
      {
        path: ROUTE.READER,
        element: <QuranReaderPage />,
      },

    ],
  },
]);

// path="/:id" element={<ProductPage />}