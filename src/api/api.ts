export enum AvailMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export const createApi = (url: string, options: Omit<RequestInit, 'url'> = {}) => {

  return ({ path, option }: { path: string, option?: Partial<Request> }) => {
    const apiUrl = new URL(url);
    apiUrl.pathname = path;
    let apiEndpoint = apiUrl.toString();
    const mergedOptions: RequestInit = Object.assign({}, options, option);

    return async (params = {}) => {
      mergedOptions.method = mergedOptions.method || AvailMethods.GET;
      if (!(mergedOptions.method in AvailMethods)) {
        throw new TypeError(`method ${mergedOptions.method} is not available`)
      }
      let body: URLSearchParams | FormData;
      switch(mergedOptions.method) {
        case AvailMethods.GET:
          const searchParams:URLSearchParams = flattenParams(params, new URLSearchParams()) as URLSearchParams
          apiEndpoint += searchParams.toString()
          break;
        default:
          body = flattenParams(params, new FormData());
      }
      const response = await fetch(apiEndpoint, {
        ...mergedOptions,
        body,
      });

      return response.json();
    }
  }
}

/**
 * flattenParams: 파라미터를 받으면, Request에 사용할 수 있도록 직렬화한다
 *
 * @param {{}} params
 * @param {(FormData | URLSearchParams)} paramContainer
 * @returns {(FormData | URLSearchParams)}
 */
export const flattenParams = (params: {}, paramContainer: FormData | URLSearchParams): FormData | URLSearchParams => {
  
  for(const [key, value] of Object.entries(params)) {
    switch(typeof value) {
      case 'object':
        if(Array.isArray(value)) {
          value.forEach((element) => {
            paramContainer.append(`${key}[]`, element);
          })
        } else {
          paramContainer.append(key, JSON.stringify(value));
        }
        break;
      case 'undefined':
      case 'function':
      case 'symbol':
        break;
      case 'bigint':
      case 'string':
      case 'number':          
          paramContainer.append(key, value.toString());
    }
  }

  return paramContainer;
}

export const moodiApi = createApi(`https://gateway.moodi.today`);

export const healthCheckApi = moodiApi({ path: '/health-check', option: { method: AvailMethods.GET }})
