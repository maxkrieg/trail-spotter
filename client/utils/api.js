import 'whatwg-fetch';

async function request({ url, data, params = {} }) {
  try {
    const config = {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...params,
    }
    if (data) {
      if (data instanceof FormData) {
        config.body = data
      } else {
        config.body = JSON.stringify(data)
      }
    }
    const response = await fetch(url, config)
    const contentType = response.headers.get('content-type');

    if (response.status < 200 || response.status >= 400) {
      const error = Error('API Error');
      error.response = response;
      throw error;
    }

    if (response.status === 200 && contentType.indexOf('application/json') !== -1) {
      return await response.json();
    }
  } catch (err) {
    console.error(await err.response.json())
    throw err
  }
  return true
}

export function get(url) {
  return request({ url });
}

export function post(url, data) {
  return request({ url, data, params: { method: 'post' } });
}

export function del(url) {
  return request({ url, params: { method: 'delete' } });
}
