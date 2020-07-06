import apiRequest from './api_request';

export async function getUserData(config) {
  return apiRequest({
    method: 'GET',
    query: 'Object=UserObject&Method=GetUserData',
    basic: config.basic,
  })
}