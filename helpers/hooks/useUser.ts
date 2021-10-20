import useSWR from "swr";
import { User } from "../../interfaces/User";
import { Error } from "../../interfaces/Error";
import { getFetcher } from "../axios/getFetcher";

interface ReturnType {
  user: User | undefined;
  isLoading: boolean;
  isError: Error | undefined;
}

export default function useUser(id: number): ReturnType {
  const { data, error } = useSWR<User, Error>(`/v1/user/${id}`, getFetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
