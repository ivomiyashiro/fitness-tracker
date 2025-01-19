import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { getDevice } from "@/helpers/getDevice";

import AppRouter from "@/routes";

const queryClient = new QueryClient();

const App = () => {
  const device = getDevice();

  if (device === "desktop") {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <p>Ops! This app is not compatible with your device yet</p>
        <p>Try in a mobile device</p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
