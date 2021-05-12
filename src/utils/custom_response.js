module.exports = {
  ErrorResponse: (h, statusCode, message) => {
    const response = h
      .response({
        status: "fail",
        message,
      })
      .code(statusCode);

    return response;
  },
  GenericErrorResponse: (h, message) => {
    const response = h
      .response({
        status: "error",
        message,
      })
      .code(500);

    return response;
  },
  SuccessResponse: (h, statusCode, message, data) => {
    const response = h
      .response({
        status: "success",
        message,
        data,
      })
      .code(statusCode);

    return response;
  },
  SuccessNoMsgResponse: (h, statusCode, data) => {
    const response = h
      .response({
        status: "success",
        data,
      })
      .code(statusCode);

    return response;
  },
  CustomResponse: (h, statusCode, data) => {
    const response = h.response(data).code(statusCode);

    return response;
  },
};
