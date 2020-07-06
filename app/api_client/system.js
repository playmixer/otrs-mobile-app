import api_request from './api_request';

export async function systemTime(config) {
  return api_request({
    method: "GET",
    query: 'Object=TimeObject&Method=CurrentTimestamp',
    basic: config.basic
  })
}