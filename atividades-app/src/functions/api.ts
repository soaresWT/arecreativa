// @ts-nocheck
export const API_URL = process.env.API_URL;

export function TOKEN_POST() {
  return { url: API_URL + `/users/login` };
}

export function USER_GET() {
  return { url: API_URL + `/users` };
}

export function USER_POST() {
  return { url: API_URL + `/users/register` };
}

export function ACTIVITY_POST() {
  return { url: API_URL + `/activities` };
}

export function ACTIVITY_GET() {
  return { url: API_URL + `/activities` };
}

export function ACTIVITY_PUT() {
  return { url: API_URL + `/activities` };
}
