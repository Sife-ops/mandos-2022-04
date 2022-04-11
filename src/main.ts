import {
  validate,
  isBool,
  required,
  ValidationRules,
} from 'https://deno.land/x/validasaur/mod.ts';

interface ApiResponse {
  success: boolean;
  data: any;
}

const ApiResponseRules: ValidationRules = {
  success: [required, isBool],
};

const apiRequest = async (endpoint: string, init: RequestInit) => {
  const url = 'http://localhost:8087';
  const response = await fetch(`${url}${endpoint}`, init);

  if (!response.ok) {
    throw new Error(`http error ${response.status}`);
  }

  const json = await response.json();

  const [pass, err] = await validate(json, ApiResponseRules);
  if (!pass) {
    throw new Error(`api response validation error ${err}`);
  }
  const apiResponse = json as ApiResponse;

  if (!apiResponse.success) {
    throw new Error('request unsuccessful');
  }

  return apiResponse;
};

const response = await apiRequest('/list/object/items', { method: 'GET' });
console.log(response.data);