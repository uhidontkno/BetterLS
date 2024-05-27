import c, { bgMagenta } from "colors/safe";
import { resolve } from "path";
import { readdir } from "node:fs/promises";


let path = resolve(process.argv.at(-1) || "./");
let files = await readdir("./",{ withFileTypes: true });
try {
    files = await readdir(path,{ withFileTypes: true });
}
catch (e) {
    console.warn(c.red(c.bold("error: ")) + e)
}
let f:string[] = []
for (let i = 0; i < files.length; i++) {
    f[i] = files[i].name
    
    if (files[i].isDirectory()) {
        f[i] = c.blue(files[i].name)
    }
    
    if (files[i].isSymbolicLink()) {
        f[i] = c.red(files[i].name)
    }

    if ( files[i].name.startsWith(".")) {
        f[i] = c.dim(files[i].name);
    }
    if (files[i].isDirectory() && files[i].name.startsWith(".")) {
        f[i] = c.dim(c.yellow(files[i].name));
    }
    if (files[i].isBlockDevice()) {
        f[i] = c.bgBlue(files[i].name)
    }
    if (files[i].isCharacterDevice()) {
        f[i] = c.bold(files[i].name)
    }}

console.log(f.join("  "))