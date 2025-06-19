
import App from "app/App";
import { BookmarksDashboard, Home, QuranSearch, Settings } from "features";
import { createBrowserRouter } from "react-router-dom";
import { ROUTE } from "shared/lib/constants";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

      {

        path: "/",
        element: <Home />,
      },
      {
        path: ROUTE.SEARCH,
        element: <QuranSearch />,
      },
      {
        path: ROUTE.BOOKMARK,
        element: <BookmarksDashboard />,
      },
      {
        path: ROUTE.SETTINGS,
        element: <Settings />,
      },

    ],
  },
]);