import { z } from 'https://deno.land/x/zod@v3.14.4/mod.ts';

const ApiResponse = z.object({
  success: z.boolean(),
  data: z.any(),
});

const apiRequest = async (endpoint: string, init: RequestInit) => {
  const url = 'http://localhost:8087';
  const response = await fetch(`${url}${endpoint}`, init);

  if (!response.ok) {
    throw new Error(`http error ${response.status}`);
  }

  const json = await response.json();

  return ApiResponse.parse(json);
};

const response = await apiRequest('/list/object/items', { method: 'GET' });
console.log(response.data);
