import { createRouteHandler } from 'uploadthing/next';
import { UTApi } from 'uploadthing/server';
import { ourFileRouter } from './core';

export const { POST, GET } = createRouteHandler({ router: ourFileRouter });

export const utapi = new UTApi();
