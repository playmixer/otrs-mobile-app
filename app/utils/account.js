import base64 from 'base-64';

export const generationBasic = (username, password) => {
  return base64.encode(`${username}:${password}`);
}
