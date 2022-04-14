import * as c from '../../utility/constant.ts';
import * as t from './type.ts';

const apiRequest = async (endpoint: string, init: RequestInit) => {
  const response = await fetch(`${c.url}${endpoint}`, init);

  if (!response.ok) {
    throw new Error(`http error ${response.status}`);
  }

  const raw = await response.json();

  try {
    const apiResponse = t.ApiResponse.parse(raw);
    if (!apiResponse.success) {
      throw new Error('request unsuccessful');
    }
  } catch (e) {
    throw new Error(`API repsonse validation error: ${e}`);
  }

  return raw;
};

type GetEndpoint = '/generate' | '/list/object/items' | '/status';
export const apiGetRequest = async (endpoint: GetEndpoint) => {
  return await apiRequest(endpoint, { method: 'GET' });
};

type PostEndpoint = '/object/item';
export const apiPostRequest = async (
  endpoint: PostEndpoint,
  item: t.Item
): Promise<void> => {
  return await apiRequest(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
};

export const apiDeleteRequest = async (item: t.Item) => {
  return await apiRequest(`/object/${item.object}/${item.id}`, {
    method: 'DELETE',
  });
};

export const listObjectItems = async () => {
  const raw = await apiGetRequest('/list/object/items');
  const listObjectItems = t.ListObjectItems.parse(raw);
  console.log(listObjectItems.data.data[0]);
  return listObjectItems.data.data;
};
