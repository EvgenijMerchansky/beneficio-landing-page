export const isProd = process.env.NODE_ENV === 'dev';
export const devAndProd = (dev, prod) => (isProd ? prod : dev);
export const isDev = !isProd;
