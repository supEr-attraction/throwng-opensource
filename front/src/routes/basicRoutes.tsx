import QuizCountDown from "@pages/quiz/QuizCountDown";
import QuizCouponPage from "@pages/quiz/QuizCouponPage";
import QuizFailPage from "@pages/quiz/QuizFailPage";
import QuizInfoPage from "@pages/quiz/QuizInfoPage";
import QuizSolvePage from "@pages/quiz/QuizSolvePage";
import QuizSuccessPage from "@pages/quiz/QuizSuccessPage";
import { lazy } from "react";
const PrivateRoute = lazy(() => import("@components/PrivateRoute"));
const HomePage = lazy(() => import("@pages/HomePage"));
const MyPage = lazy(() => import("@pages/MyPage"));
const PlayListPage = lazy(() => import("@pages/PlayListPage"));
const MusicSearchPage = lazy(() => import("@pages/MusicSearchPage"));
const NotificationPage = lazy(() => import("@pages/NotificationPage"));
const MyCouponPage = lazy(() => (import("@pages/MyCouponPage")))
// const Error404 = loadable(() => import("./Error404"));
const MusicDrop = lazy(() => import("@pages/musicDrop/MusicDrop"));
const QuizMain = lazy(() => import("@pages/quiz/QuizMainPage"));
const MusicPickDetailPage = lazy(() => import("@pages/MusicPickDetailPage"));
const MusicList = lazy(() => import("@components/musicSearch/MusicList"));

const QuizClosePage = lazy(() => import("@pages/quiz/QuizClosePage"));
const NonePermissionPage = lazy(() => import("@pages/NonePermissionPage"));

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
        {
          path: "mycoupons",
          element: <MyCouponPage/>
        },
      ],
    },
    {
      path: "music",
      children: [
        {
          path: "search",
          children: [
            { index: true, element: <MusicSearchPage /> },
            {
              path: ":id",
              element: <MusicList />,
            },
          ],
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
          path: "info",
          element: <QuizInfoPage />,
        },
        {
          path: "count",
          element: <QuizCountDown />,
        },
        {
          path: "solve",
          element: <QuizSolvePage />,
        },
        {
          path: "success",
          element: <QuizSuccessPage />,
        },
        {
          path: "coupon",
          element: <QuizCouponPage />,
        },
        {
          path: "fail",
          element: <QuizFailPage />,
        },
        {
          path: "*",
          element: <QuizClosePage />,
        },
      ],
    },
    { path: "none-permission", element: <NonePermissionPage /> },
  ],
};
