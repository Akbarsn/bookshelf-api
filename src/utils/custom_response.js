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
};
