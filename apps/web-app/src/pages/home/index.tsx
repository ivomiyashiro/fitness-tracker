import { useApp } from "@/hooks/use-app";

export const Home = () => {
  const { data, isLoading, error } = useApp();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl text-red-500">{data?.message}</h1>
    </div>
  );
};
