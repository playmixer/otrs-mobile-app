import api_request from './api_request';

export async function getQueuesOfUser(config) {
  return api_request({
    method: "GET",
    query: `Object=QueueObject&Method=GetAllQueues&Data={"UserID":"${config.userId}","Type":"rw"}`,
    basic: config.basic
  })
}