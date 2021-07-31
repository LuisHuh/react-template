// #region MANEJADOR DE ERRORES PARA LAS PETICIONES
const fetchErrorHandler = (response) => {
   if (response.error === true) {
      return Promise.reject({
         error: true,
         message: response.message || 'There was an unexpected error.',
         data: response
      })
   }
   return response;
};

export default fetchErrorHandler;
// #endregion / MANEJADOR DE ERRORES PARA LAS PETICIONES