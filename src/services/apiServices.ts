import authApi, { publicApi } from "./AxiosInstance";


export const getRequest = async <T>(url: string, params?: any): Promise<T> => {
  const res = await authApi.get<T>(url, { params });
  return res.data;
};

export const postRequest = async <T>(
  url: string,
  body?: any
): Promise<T> => {
  const res = await authApi.post<T>(url, body);
  return res.data;
};

export const putRequest = async <T>(
  url: string,
  body?: any
): Promise<T> => {
  const res = await authApi.put<T>(url, body);
  return res.data;
};

export const deleteRequest = async <T>(url: string): Promise<T> => {
  const res = await authApi.delete<T>(url);
  return res.data;
};

export const postRequestNoAuth = async <T>(
  url: string,
  body?: any
): Promise<T> => {
  const res = await publicApi.post<T>(url, body);
  return res.data;
};