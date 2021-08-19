require('dotenv').config();
export const url = process.env.REACT_APP_API_URL;

export async function postApi(route, body) {
  const response = await fetch(url + route, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return response.json();
}
