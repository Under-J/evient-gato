import { createBrowserRouter } from 'react-router-dom';

import {
  Home,
  Match,
  pagePaths,
  CreateNewPlayer,
  ChoosePlayers,
} from '../pages';
import { Root } from './root';

export const router = createBrowserRouter([
  {
    path: pagePaths.home,
    element: <Root />,
    errorElement: <p>Error!</p>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: pagePaths.createNewPlayer,
        element: <CreateNewPlayer />,
      },
      {
        path: pagePaths.choosePlayers,
        element: <ChoosePlayers />,
      },
      {
        path: pagePaths.match,
        element: <Match />,
      },
    ],
  },
]);
