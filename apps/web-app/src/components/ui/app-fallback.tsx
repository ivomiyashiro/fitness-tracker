import { Spinner } from "./spinner";

export const AppFallback = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};
