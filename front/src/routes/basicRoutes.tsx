import { lazy } from "react";
import PrivateRoute from "@components/PrivateRoute";
import Error404 from "@pages/Error404";
import ContentSuccessPage from "@pages/content/ContentSuccessPage";

import HomePage from "@pages/HomePage";
const MyPage = lazy(() => import("@pages/MyPage"));
const PlayListPage = lazy(() => import("@pages/PlayListPage"));
const MusicSearchPage = lazy(() => import("@pages/MusicSearchPage"));
const NotificationPage = lazy(() => import("@pages/NotificationPage"));
const MyCouponPage = lazy(() => import("@pages/MyCouponPage"));
const MyOtpPage = lazy(() => import("@pages/MyOtpPage"));
const ChangeNickNamePage = lazy(() => import("@pages/ChangeNickNamePage"));
const MusicDrop = lazy(() => import("@pages/musicDrop/MusicDrop"));
const QuizMain = lazy(() => import("@pages/content/quiz/QuizMainPage"));
const MusicPickDetailPage = lazy(() => import("@pages/MusicPickDetailPage"));
const MusicList = lazy(() => import("@components/musicSearch/MusicList"));
const NonePermissionPage = lazy(() => import("@pages/NonePermissionPage"));
const QuizClosePage = lazy(() => import("@pages/content/quiz/QuizClosePage"));
const ContentPage = lazy(() => import("@pages/content/ContentPage"));
const QuizCountDown = lazy(() => import("@pages/content/quiz/QuizCountDown"));
const QuizCouponPage = lazy(() => import("@pages/content/quiz/QuizCouponPage"));
const QuizFailPage = lazy(() => import("@pages/content/quiz/QuizFailPage"));
const QuizInfoPage = lazy(() => import("@pages/content/quiz/QuizInfoPage"));
const QuizSolvePage = lazy(() => import("@pages/content/quiz/QuizSolvePage"));
const MemoryTestPage = lazy(
  () => import("@pages/content/memory/MemoryTestPage")
);
const MemoryInfoPage = lazy(
  () => import("@pages/content/memory/MemoryInfoPage")
);
const MemoryMainPage = lazy(
  () => import("@pages/content/memory/MemoryMainPage")
);
const MemoryCouponPage = lazy(
  () => import("@pages/content/memory/MemoryCouponPage")
);
const RhythmGamePage = lazy(
  () => import("@pages/content/rhythm/RhythmGamePage")
);
const RhythmMainPage = lazy(
  () => import("@pages/content/rhythm/RhythmMainPage")
);
const RhythmInfoPage = lazy(
  () => import("@pages/content/rhythm/RhythmInfoPage")
);
const RhythmResultPage = lazy(
  () => import("@pages/content/rhythm/RhythmResultPage")
);
const RhythmCouponPage = lazy(
  () => import("@pages/content/rhythm/RhythmCouponPage")
);

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
      path: "close",
      element: <QuizClosePage />,
    },
    {
      path: ":type/success",
      element: <ContentSuccessPage />,
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
          path: "coupon",
          element: <QuizCouponPage />,
        },
        {
          path: "fail",
          element: <QuizFailPage />,
        },
      ],
    },
    {
      path: "rhythm",
      children: [
        {
          path: "main",
          element: <RhythmMainPage />,
        },
        {
          path: "info",
          element: <RhythmInfoPage />,
        },
        {
          path: "game",
          element: <RhythmGamePage />,
        },
        {
          path: "result",
          element: <RhythmResultPage />,
        },
        {
          path: "coupon",
          element: <RhythmCouponPage />,
        },
      ],
    },
    {
      path: "memory",
      children: [
        {
          path: "main",
          element: <MemoryMainPage />,
        },
        {
          path: "info",
          element: <MemoryInfoPage />,
        },
        {
          path: "game",
          element: <MemoryTestPage />,
        },
        {
          path: "coupon",
          element: <MemoryCouponPage />,
        },
      ],
    },
    { path: "none-permission", element: <NonePermissionPage /> },
  ],
  errorElement: <Error404 />,
};
