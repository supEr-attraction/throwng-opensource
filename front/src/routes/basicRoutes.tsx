import { lazy } from "react";
import PrivateRoute from "@components/PrivateRoute";
import Error404 from "@pages/Error404";


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
const MemoryTestPage = lazy(() => import("@pages/game/MemoryTestPage"));
const MemoryInfoPage = lazy(() => import("@pages/game/MemoryInfoPage"));
const MemoryMainPage = lazy(() => import("@pages/game/MemoryMainPage"));
const MemoryCouponPage = lazy(() => import("@pages/game/MemoryCouponPage"));
const MemorySuccessPage = lazy(() => import("@pages/game/MemorySuccessPage"));
const RhythmGamePage = lazy(() => import("@pages/game/RhythmGamePage"));
const RhythmMainPage = lazy(() => import("@pages/game/RhythmMainPage"));
const RhythmInfoPage = lazy(() => import("@pages/game/RhythmInfoPage"));
const RhythmResultPage = lazy(() => import("@pages/game/RhythmResultPage"));
const RhythmSuccessPage = lazy(() => import("@pages/game/RhythmSuccessPage"));
const RhythmCouponPage = lazy(() => import("@pages/game/RhythmCouponPage"));

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
      element: <QuizClosePage />
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
          path: "success",
          element: <RhythmSuccessPage />,
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
          path: "success",
          element: <MemorySuccessPage />,
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
