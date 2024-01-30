import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes. Define as many FileRoutes as you like, each with a unique routeSlug.
export const ourFileRouter = {} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
