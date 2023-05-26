import { formatHTML } from "./formatHTML.js";

const fn = "test3.html";
const html = await Deno.readTextFile(fn);
const res = formatHTML(html);
console.log(res);

