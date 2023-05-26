import { formatHTML } from "./formatHTML.js";

const fn = "test.html";
const html = await Deno.readTextFile(fn);
const res = formatHTML(html);
console.log(res);

