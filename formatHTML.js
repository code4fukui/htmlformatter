import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const tags = await CSV.fetchJSON("./htmltags.csv");
export const isValidTag = (tag) => {
  if (tag.indexOf("-") >= 0) {
    return true;
  }
  return tags.find(t => t.tag == tag.toLowerCase()) != null;
};
export const isOmitCloseTag = (tag) => {
  if (tag.indexOf("-") >= 0) {
    return false;
  }
  const t = tags.find(t => t.tag == tag.toLowerCase());
  if (!t) {
    return false;
  }
  return t.omitclose == "true";
};
//console.log(isValidTag("html"));
//Deno.exit();

export const formatHTML = (html) => {
  const dom = HTMLParser.parse(html);
  //console.log(dom);
  const res = [];
  let indent = "";
  const out = (dom, indent) => {
    if (dom.nodeType == 1) { // HTMLElement
      const tag = dom.rawTagName;
      if (tag == null) { // top level
        for (const c of dom.childNodes) {
          out(c, indent);
        }
      } else if (isValidTag(tag)) {
        res.push(indent + `<${tag}${dom.rawAttrs ? " " + dom.rawAttrs : ""}>`);
        const n = res.length;
        for (const c of dom.childNodes) {
          out(c, indent + "  ");
        }
        if (res.length == n) {
          if (!isOmitCloseTag(tag)) {
            res[res.length - 1] += `</${tag}>`;
          }
        } else {
          res.push(indent + `</${tag}>`);
        }
      } else {
        throw new Error("invalid tag! " + tag);
      }
    } else if (dom.nodeType == 3) { // TextNode
      const text = dom._rawText.trim();
      if (text.length > 0) {
        res.push(indent + text);
      }
    } else {
      throw new Error(dom.nodeType);
    }
  };
  out(dom, indent);
  return res.join("\n");
};
