import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import toast from 'react-hot-toast';
import { logOut, setUser } from './fetures/auth';
import { TagTypeList } from '../tagTypes';


const baseQuery = fetchBaseQuery({
  baseUrl: 'https://healthcareserver-two.vercel.app/api/v1/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions) as any;
  if (result?.error?.status === 404) {
    toast.error(result.error.data.message);
  }
  if (result?.error?.status === 403) {
    toast.error(result.error.data.message);
  }
  if (result?.error?.status === 401) {
  
    const res = await fetch('https://healthcareserver-two.vercel.app/api/v1/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user as any;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: TagTypeList,
  endpoints: () => ({}),
});