
 module.exports = async (req, res, next) => {
  try { 
  
      req.getInstance = (name)=> { 
        modelInstance = eval("db.models."+name);
        modelInstance._schema = req.database;
        return modelInstance;
    };
      next();

  } catch (err) {
    next(err)

  }
}