import QuizSolvePage from "@pages/quiz/QuizSolvePage";
import { lazy } from "react";
const PrivateRoute = lazy(() => import("@components/PrivateRoute"));
const HomePage = lazy(() => import("@pages/HomePage"));
const MyPage = lazy(() => import("@pages/MyPage"));
const PlayListPage = lazy(() => import("@pages/PlayListPage"));
const MusicSearchPage = lazy(() => import("@pages/MusicSearchPage"));
const NotificationPage = lazy(() => import("@pages/NotificationPage"));
// const Error404 = loadable(() => import("./Error404"));

const MusicDrop = lazy(() => import("@pages/musicDrop/MusicDrop"))
const QuizMain = lazy(() => import("@pages/quiz/QuizMainPage"));
const MusicPickDetailPage = lazy(() => import("@pages/MusicPickDetailPage"));


export default {
  path: "/",
  element: <PrivateRoute />,
  children: [
    { index: true, element: <HomePage /> },
    {
      path: "user",
      children: [
        {
          path: "mypage",
          element: <MyPage />,
        },
        {
          path: "playlist",
          element: <PlayListPage />,
        },
        {
          path: "notification",
          element: <NotificationPage />,
        },
      ],
    },
    {
      path: "music",
      children: [
        {
          path: "search",
          element: <MusicSearchPage />,
        },
        {
          path: "drop",
          children: [
            {
              path: ":id",
              element: <MusicDrop />,
            },
          ],
        },
        {
          path: "pick",
          children: [
            {
              path: ":id",
              element: <MusicPickDetailPage />,
            },
          ],
        },
      ],
    },
    {
      path: "quiz",
      children: [
        {
          path: "main",
          element: <QuizMain />,
        },
        {
          path: "solve",
          element: <QuizSolvePage />,
        },
      ],
    },
  ],
};
