import { test, expect } from "vitest";
import  prisma from "../../src/prisma";

test("Ensure Prisma Singleton contains note schemaq", async () => {
    expect(prisma).toHaveProperty('note');
});
