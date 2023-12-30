const { flatRoutes } = require('remix-flat-routes')


/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  serverDependenciesToBundle: [/^react-icons/],
  routes: async defineRoutes => {
    return flatRoutes('routes', defineRoutes)
  },
};
