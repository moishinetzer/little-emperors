// TODO: explain ends in .server.ts
// Explain nice abstraction for keeping server seperate export

import { remember } from "@epic-web/remember";
import { PrismaClient } from "@prisma/client";

// This keeps the original connection across dev server restarts
// See: https://github.com/epicweb-dev/remember
export const db = remember("prisma", () => new PrismaClient());
