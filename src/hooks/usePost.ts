import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import type { Links, Post } from "../types/post.types";

export type PostResponse = {
  data: Post[];
  links: {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Links[];
    per_page: number;
    to: number;
    total: number;
  };
};

type Params = {
  page?: {
    number?: number;
    size?: number;
  };
  append?: string[];
  sort?: string;
};

const fetchPost = async (params?: Params) => {
  const queryParams = new URLSearchParams();

  if (params?.page?.number) {
    queryParams.append("page[number]", params.page.number.toString());
  }
  if (params?.page?.size) {
    queryParams.append("page[size]", params.page.size.toString());
  }
  if (params?.append) {
    params.append.forEach((item) => {
      queryParams.append("append[]", item);
    });
  }
  if (params?.sort) {
    queryParams.append("sort", params.sort);
  }

  const response = await axiosInstance.get<PostResponse>(
    `/ideas?${queryParams.toString()}`
  );
  return response.data;
};

export const usePost = (params?: Params) => {
  return useQuery({
    queryKey: ["posts", params], // Updated queryKey to include params for proper caching
    queryFn: () => fetchPost(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
