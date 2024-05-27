import c from "colors/safe";
import { resolve } from "path";
// @ts-expect-error
const path = resolve(process.argv.at(-1));
console.log(path)