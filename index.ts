import c from "colors/safe";
import { resolve } from "path";
import { readdir } from "node:fs/promises";

// @ts-expect-error
const path = resolve(process.argv.at(-1));
const files = await readdir(path);
for (let i = 0; i < files.length; i++) {
    if (files[i].startsWith(".")) {
        files[i] = c.gray(files[i]);
    }
    
}

console.log(files.join(" "))