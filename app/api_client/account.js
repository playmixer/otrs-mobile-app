import apiRequest from './api_request';

export async function getUserData(config) {
  return apiRequest({
    method: 'GET',
    query: 'Object=UserObject&Method=GetUserData',
    basic: config.basic,
  })
}

export async function getUserName(config) {
  return apiRequest({
    method: "GET",
    query: `Object=UserObject&Method=UserName&Data={"UserID":"${userID}"}`,
    basic: config.basic,
  })
}