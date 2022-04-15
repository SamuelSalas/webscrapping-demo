import { Router } from 'express';
import glob from 'glob';

export function registerRoutes(router: Router) {
  const routes = glob.sync(`${__dirname}/**/*.routes.*`);
  routes.map((route: string) => register(route, router));
}

function register(routePath: string, router: Router) {
  try {
    const route = require(routePath);
    route.register(router);
  } catch (error) {
    console.log((error as Error).message)
  }
}