// Purpose: Middleware to handle 404 errors
const notFound = (req, res, next) => {
    const error = new Error('Not Found');
    res.status(404).send( `<h1 style="background-color: grey; font-size: 80px; text-align: center; color: white">${error.message} </h1>`);
    next();
}

export default notFound;