import colors from 'colors';

const requestEndpoints = (req, res, next) => {
    
   const requestColors = {
        GET: 'blue',
        POST: 'green',
        PUT: 'yellow',
        DELETE: 'red'
    }

    const color = requestColors[req.method];
    console.log(`Request_Endpoint: ${req.method} ${req.url}`
        [color]
    );
    next();
}

export default requestEndpoints;

