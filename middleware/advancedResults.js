const advancedResults = (model, populate) => async(req, res, next) => {
    let query;

    // Copiando el req.query
    const reqQuery = { ...req.query };

    // Arreglo donde colocamos las excepciones que no queremos salgan en el req.query
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Iterando sobre el arreglo removeFields y eliminamos los valores de reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Creando un string del query
    let queryStr = JSON.stringify(reqQuery);

    // el signo de $ antes de los matches es para que coincida con una sintaxis especial de mongoose
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match  => `$${match}`);

    // Buscando los recursos
    query = model.find(JSON.parse(queryStr));

    // --- Filtrando con el RemoveFields
    // SELECT
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields)
    }

    // SORT
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }else{
        query = query.sort('-createdAt');
    }

    //  Paginacion
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    query = query.skip(startIndex).limit(limit);

    if(populate) {
        query = query.populate(populate)
    }


    // Ejecutando el query
    const results = await query;

    //  Resultado de la paginacion
    const pagination = {};

    if(endIndex < total){
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if(startIndex > 0){
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    res.advancedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results
    }

    next();
}

module.exports = advancedResults;