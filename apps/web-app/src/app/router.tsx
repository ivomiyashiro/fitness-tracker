import {
  ActionFunction,
  LoaderFunction,
  RouterProvider,
  createBrowserRouter,
} from "react-router";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

import { AppLayout } from "@/components/layouts/app/app.layout";
import { AppFallback } from "@/components/ui/app-fallback";

interface RouteModule {
  default: React.ComponentType;
  clientLoader?: (queryClient: QueryClient) => LoaderFunction;
  clientAction?: (queryClient: QueryClient) => ActionFunction;
}

const convert =
  (queryClient: QueryClient) =>
  (
    m: unknown,
  ): {
    loader?: LoaderFunction;
    action?: ActionFunction;
    Component: React.ComponentType;
  } => {
    const module = m as Partial<RouteModule>;

    return {
      loader: module.clientLoader?.(queryClient),
      action: module.clientAction?.(queryClient),
      Component: module.default ?? (() => null),
    };
  };

const createAppRouter = (queryClient: QueryClient) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      hydrateFallbackElement: <AppFallback />,
      children: [
        {
          path: "/training-plans",
          hydrateFallbackElement: <AppFallback />,
          lazy: () =>
            import("./training-plans/training-plans.page").then(
              convert(queryClient),
            ),
        },
        {
          path: "/training-plans/:trainingPlanId/workouts",
          hydrateFallbackElement: <AppFallback />,
          lazy: () =>
            import("./workouts/workouts.page").then(convert(queryClient)),
        },
        {
          path: "*",
          lazy: () =>
            import("./not-found/not-found.page").then(convert(queryClient)),
        },
      ],
    },
  ]);
};

export const AppRouter = () => {
  const queryClient = useQueryClient();
  const router = createAppRouter(queryClient);

  return <RouterProvider router={router} />;
};
