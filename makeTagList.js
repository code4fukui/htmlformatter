import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const omitclosetags = [
  "base",   "link",
  "meta",   "hr",
  "br",     "wbr",
  "audio",  "img",
  "source", "input",
  "option", "image"
];

const list = [];

const url = "https://developer.mozilla.org/ja/docs/Web/HTML/Element";
const html = await fetchOrLoad(url);
const dom = HTMLParser.parse(html);
const trs = dom.querySelectorAll("figure.table-container tbody tr");
for (const tr of trs) {
  const tds = tr.querySelectorAll("td");
  const tags = tds[0].text.split(", ");
  const description = tds[1].text;
  for (const tag0 of tags) {
    const tag = tag0.substring(1, tag0.length - 1);
    const omitclose = omitclosetags.indexOf(tag) >= 0;
    list.push({ tag, description, omitclose });
  }
}
console.log(list);
await Deno.writeTextFile("htmltags.csv", CSV.stringify(list));
/*
  <tbody>
    <tr>
      <td><a href="/ja/docs/Web/HTML/Element/html"><code>&lt;html&gt;</code></a></td>
      <td>HTML 文書のルート（最上位要素）を表すため、<em>ルート要素</em>とも呼ばれます。他のすべての要素は、この要素の子孫として配置しなければなりません。</td>
    </tr>
  </tbody>
*/
