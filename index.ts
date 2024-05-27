import c, { bgMagenta } from "colors/safe";
import { resolve } from "path";
import { readdir } from "node:fs/promises";

let path = resolve(process.argv.at(-1) || "./");
let files = await readdir("./", { withFileTypes: true });
try {
  files = await readdir(path, { withFileTypes: true });
} catch (e) {
  console.warn(c.red(c.bold("error: ")) + e);
}
let f: string[] = [];
for (let file of files) {
  let name = file.name;

  if (file.isDirectory() && !file.name.startsWith(".")) {
    name = c.blue(name);
  }
  if (file.isSymbolicLink()) {
    name = c.red(name);
  }
  if (file.isFile() && file.name.startsWith(".")) {
    name = c.dim(name);
  }
  if (file.isDirectory() && file.name.startsWith(".")) {
    name = c.dim(c.blue(name));
  }
  if (file.isBlockDevice()) {
    name = c.bgBlue(name);
  }
  if (file.isCharacterDevice()) {
    name = c.italic(name);
  }
  if (file.isSocket()) {
    name = c.bgGreen(name);
  }
  
  f.push(name);
}
const displayGrid = (array: string[]): void => {
   let length = 0;
   
   for (let i = 0; i < array.length; i++) {
    array[i] = `${array[i]}  `
   if ((length + c.stripColors(array[i]).length)  >= (process.stdout.columns - 12)) {
    console.write("\n")
    length = 0;
   } 
   console.write(array[i])
   length += c.stripColors(array[i]).length
    }
    console.write("\n")
};



displayGrid(f)