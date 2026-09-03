export const errorHandler = (err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack || err.message);

  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === 'production';

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(isProd ? {} : { stack: err.stack })
  });
};
