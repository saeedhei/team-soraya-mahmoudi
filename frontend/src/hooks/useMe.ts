// src/hooks/useMe.ts
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "@/graphql/queries/meQuery";

export function useMe() {
  const { data, loading, error } = useQuery(ME_QUERY);
  return {
    user: data?.me || null,
    loading,
    error,
  };
}
