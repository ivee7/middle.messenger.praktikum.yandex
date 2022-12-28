export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface Options {
    data: string;
    headers: {
      [key: string]: unknown;
    };
    timeout: number;
    method: string;
}

function queryStringify(data: string) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export default class HTTPTransport {
  get = (url: string, options: Options) => this.request(
    url,
    { ...options, method: METHOD.GET },
    options.timeout,
  );

  post = (url: string, options: Options) => this.request(
    url,
    { ...options, method: METHOD.POST },
    options.timeout,
  );

  put = (url: string, options: Options) => this.request(
    url,
    { ...options, method: METHOD.PUT },
    options.timeout,
  );

  delete = (url: string, options: Options) => this.request(
    url,
    { ...options, method: METHOD.DELETE },
    options.timeout,
  );

  private request = (url: string, options: Options, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key] as string);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
