import authenticationVerify from "./authenticationVerify";

export default (handler) => {
  return async (req, res) => {
    try {

      const route = req.url;
      // console.log(`++ ${req.method} ${route}`);
      // console.log(req.body);
      
      if (route.startsWith("/api/items")) {
        await authenticationVerify(req, res);
      }

      const result = await handler(req, res);

      const statusCode = res.statusCode ? res.statusCode : 200;
      res.status(statusCode).json({
        type: "RESULT",
        message: res.message || "OK",
        result: result,
        error: null,
        code: statusCode,
      });

    } catch (error) {
      const statusCode = res.statusCode ? res.statusCode : 500;

      res.status(statusCode).json({
        type: "ERROR",
        message: error.message,
        result: null,
        error: error,
        code: statusCode,
      });
    }
  };
};
