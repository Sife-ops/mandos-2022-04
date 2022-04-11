import { z } from 'https://deno.land/x/zod@v3.14.4/mod.ts';

const url = 'http://localhost:8087';

const ApiResponse = z.object({
  success: z.boolean(),
});

const apiRequest = async (endpoint: string, init: RequestInit) => {
  const response = await fetch(`${url}${endpoint}`, init);

  if (!response.ok) {
    throw new Error(`http error ${response.status}`);
  }

  const raw = await response.json();

  try {
    const apiResponse = ApiResponse.parse(raw);
    if (!apiResponse.success) {
      throw new Error('request unsuccessful');
    }
  } catch (e) {
    throw new Error(`API repsonse validation error: ${e}`);
  }

  return raw;
};

const ListObjectItems = z.object({
  data: z.object({
    object: z.string(),
    data: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        object: z.string(),
        type: z.number(),
        login: z.union([
          z.object({
            username: z.union([z.string(), z.null()]),
            password: z.union([z.string(), z.null()]),
          }),
          z.undefined(),
        ]),
      })
    ),
  }),
});

export const listObjectItems = async () => {
  const raw = await apiRequest('/list/object/items', { method: 'GET' });
  const listObjectItems = ListObjectItems.parse(raw);
  return listObjectItems.data.data;
};