import axios from 'axios';

const URL = 'https://otrs-itsm.oilpc.ru/json?'

const headers = (basic) => {

  return {
    'Content-type': 'application/json',
    'Authorization': `Basic ${basic}`,
  }
}

const apiRequest = async (config) => {
  return await axios({
    method: config.method,
    url: URL+config.query,
    headers: headers(config.basic)    
  })
}

export default apiRequest
