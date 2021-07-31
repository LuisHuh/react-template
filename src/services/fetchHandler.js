import parse from 'url-parse';
import ResponseFormatter from '../server/libraries/ResponseFormatter';

/**Solicita el token guardado por auth al cliente */
async function getAuthTokenHeader(){
  const allClients = await self.clients.matchAll();
  const client = allClients.filter(client => client.type === 'window')[0];

  console.debug('Requesting auth token header from app');
  if(!client) {
    return null;
  }

  const channel = new MessageChannel();
  client.postMessage({
    'action': 'getAuthTokenHeader'
  }, [channel.port1]);

  return new Promise((resolve, reject) => {
    channel.port2.onmessage = event => {
      if (event.data.error) {
        console.error('Port error', event.error);
        reject(event.data.error);
      }

      resolve(event.data.authHeader);
    }
  });
};

/**
 * Funcion que modifica el request del usuario
 * @param {Request} request Peticion del cliente
 */
async function getResponse(request){
  const headers = {};
  for (let entry of request.headers) {
    headers[entry[0]] = entry[1];
  }

  const token = await getAuthTokenHeader();
  if(!token) {
    if(request.mode === 'navigate') {
      const message = new ResponseFormatter('Found', 302);
      return new Response(message.get(true), {
        status: 302,
        statusText: 'Found',
        headers: new Headers({
          'location': '/login',
        })
      })
    }

    // Si no hay token, no se puede llevar a cabo la peticion.
    const message = new ResponseFormatter('Unauthorized', 401, true);
    return new Response(message.get(true), {
      status: message.code,
      statusText: message.message
    });
  }

  //Se agrega el token
  headers['Authorization'] = token;
  const body = await ['HEAD', 'GET'].includes(request.method) ? null : request.json();
  
  // console.log('apis request', request);
  return fetch(new Request(request.url, {
    method: request.method,
    headers,
    cache: request.cache,
    mode: 'cors',
    credentials: request.credentials,
    redirect: 'manual',
    body: body ? body : null
  }));
}

export default fetchEvent => {
  const request = fetchEvent.request;
  const parsed = parse(request.url);
  
  if(!parsed.pathname.startsWith('/api')) {
    /* console.log("No es una api", request.url);
    console.debug('Bypass sw on non api endpoint'); */
    fetchEvent.respondWith(fetch(request));
    return;
  }

  if(parsed.pathname === '/api/auth/login') {
    /* console.log("Login no requiere sw", request.url);
    console.debug('Bypass sw on api auth'); */
    fetchEvent.respondWith(fetch(request));
    return;
  }

  if(request.mode === 'navigate' && request.method !== 'GET') {
    /* console.log('Bypass sw on post navigation'); */
    fetchEvent.respondWith(fetchEvent(request));
    return;
  }

  fetchEvent.respondWith(getResponse(request));
};