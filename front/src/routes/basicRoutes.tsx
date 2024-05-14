import { lazy } from "react";
import PrivateRoute from "@components/PrivateRoute";
import Error404 from "@pages/Error404";
import MemoryTestPage from "@pages/game/MemoryTestPage";

import MemoryInfoPage from "@pages/game/MemoryInfoPage";
import MemoryMainPage from "@pages/game/MemoryMainPage";
import MemoryCouponPage from "@pages/game/MemoryCouponPage";
import MemorySuccessPage from "@pages/game/MemorySuccessPage";
import MoleGamePage from "@pages/game/MoleGamePage";
const HomePage = lazy(() => import("@pages/HomePage"));
const MyPage = lazy(() => import("@pages/MyPage"));
const PlayListPage = lazy(() => import("@pages/PlayListPage"));
const MusicSearchPage = lazy(() => import("@pages/MusicSearchPage"));
const NotificationPage = lazy(() => import("@pages/NotificationPage"));
const MyCouponPage = lazy(() => import("@pages/MyCouponPage"));
const MyOtpPage = lazy(() => import("@pages/MyOtpPage"));
const ChangeNickNamePage = lazy(() => import("@pages/ChangeNickNamePage"));
const MusicDrop = lazy(() => import("@pages/musicDrop/MusicDrop"));
const QuizMain = lazy(() => import("@pages/quiz/QuizMainPage"));
const MusicPickDetailPage = lazy(() => import("@pages/MusicPickDetailPage"));
const MusicList = lazy(() => import("@components/musicSearch/MusicList"));
const NonePermissionPage = lazy(() => import("@pages/NonePermissionPage"));
const QuizClosePage = lazy(() => import("@pages/quiz/QuizClosePage"));
const ContentPage = lazy(() => import("@pages/ContentPage"));
const QuizCountDown = lazy(() => import("@pages/quiz/QuizCountDown"));
const QuizCouponPage = lazy(() => import("@pages/quiz/QuizCouponPage"));
const QuizFailPage = lazy(() => import("@pages/quiz/QuizFailPage"));
const QuizInfoPage = lazy(() => import("@pages/quiz/QuizInfoPage"));
const QuizSolvePage = lazy(() => import("@pages/quiz/QuizSolvePage"));
const QuizSuccessPage = lazy(() => import("@pages/quiz/QuizSuccessPage"));

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
          children: [
            { index: true, element: <MyPage /> },
            {
              path: "change-nickname",
              element: <ChangeNickNamePage />,
            },
          ],
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
          element: <MyCouponPage />,
        },
        {
          path: "myotp",
          element: <MyOtpPage />,
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
              path: "results",
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
      path: "content",
      element: <ContentPage />,
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
    {
      path: "mole",
      children: [
        {
          path: "game",
          element: <MoleGamePage />
        },
      ]
    },
    {
      path: "memory",
      children: [
        {
          path: "main",
          element: <MemoryMainPage />
        },
        {
          path: "info",
          element: <MemoryInfoPage />
        },
        {
          path: "game",
          element: <MemoryTestPage />
        },
        {
          path: "success",
          element: <MemorySuccessPage />
        },
        {
          path: "coupon",
          element: <MemoryCouponPage />
        },
      ]
    },
    { path: "none-permission", element: <NonePermissionPage /> },
  ],
  errorElement: <Error404 />,
};
