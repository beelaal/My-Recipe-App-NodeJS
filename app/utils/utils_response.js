const crypto = require('crypto');
const makeResponse = (res, apiStatus, resStatus, type, title, message, result = []) => {
    if (type == 'error') {
      errorObj = {
        '#text': '',
        Code: '',
        ShortText: '',
      };
      if (typeof result.Errors === 'object') {
        errorObj['#text'] = result.Errors.Error['#text'];
        errorObj.Code = result.Errors.Error.Code;
        errorObj.ShortText = result.Errors.Error.ShortText;
      } else if (result.Errors == 'string') {
        errorObj['#text'] = result.Errors;
      } else {
        errorObj['#text'] = message;
      }
      res.status(resStatus).json({
        status: apiStatus,
        code: resStatus || 200,
        type: type || 'success',
        title: title || '',
        message: message || '',
        Errors: { Error: errorObj },
      }).end();
    } else {
      res.status(resStatus).json({
        status: apiStatus,
        code: resStatus || 200,
        type: type || 'success',
        title: title || '',
        message: message || '',
        result,
      }).end();
    }
  };
  let HashPassword =   (password, salt) =>{
    password = salt + password;
    const hash = crypto.createHash('sha1'); /** Hashing algorithm sha1 */
    hash.update(password);
    const value = hash.digest('hex');
    return value;
  };
  module.exports = {
    makeResponse,
    HashPassword
  };
  