import { c as create_ssr_component, l as subscribe, a as add_attribute, e as escape, n as each, v as validate_component } from "../../chunks/ssr.js";
import * as d3 from "d3";
import { w as writable } from "../../chunks/index.js";
let width = writable(0);
let height = writable(0);
let header = 64;
let footer = 64;
let rightSideBar = 128;
let leftSideBar = 128;
const LinePlot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let x;
  let y;
  let line;
  let $height, $$unsubscribe_height;
  let $width, $$unsubscribe_width;
  $$unsubscribe_height = subscribe(height, (value) => $height = value);
  $$unsubscribe_width = subscribe(width, (value) => $width = value);
  let { data } = $$props;
  let { marginTop = 20 } = $$props;
  let { marginRight = 20 } = $$props;
  let { marginBottom = 30 } = $$props;
  let { marginLeft = 40 } = $$props;
  let gx;
  let gy;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.marginTop === void 0 && $$bindings.marginTop && marginTop !== void 0)
    $$bindings.marginTop(marginTop);
  if ($$props.marginRight === void 0 && $$bindings.marginRight && marginRight !== void 0)
    $$bindings.marginRight(marginRight);
  if ($$props.marginBottom === void 0 && $$bindings.marginBottom && marginBottom !== void 0)
    $$bindings.marginBottom(marginBottom);
  if ($$props.marginLeft === void 0 && $$bindings.marginLeft && marginLeft !== void 0)
    $$bindings.marginLeft(marginLeft);
  x = d3.scaleLinear([0, data.length - 1], [marginLeft, $width - marginRight - rightSideBar - leftSideBar]);
  y = d3.scaleLinear(d3.extent(data), [$height - marginBottom - footer - header, marginTop]);
  line = d3.line((d, i) => x(i), y);
  {
    d3.select(gy).call(d3.axisLeft(y));
  }
  {
    d3.select(gx).call(d3.axisBottom(x));
  }
  $$unsubscribe_height();
  $$unsubscribe_width();
  return `<svg${add_attribute("width", $width - leftSideBar, 0)}${add_attribute("height", $height - footer - header, 0)}><g transform="${"translate(0," + escape($height - marginBottom - footer - header, true) + ")"}"${add_attribute("this", gx, 0)}></g><g transform="${"translate(" + escape(marginLeft, true) + ",0)"}"${add_attribute("this", gy, 0)}></g><path fill="none" stroke="currentColor" stroke-width="1.5"${add_attribute("d", line(data), 0)}></path><g fill="white" stroke="currentColor" stroke-width="1.5">${each(data, (d, i) => {
    return `<circle${add_attribute("key", i, 0)}${add_attribute("cx", x(i), 0)}${add_attribute("cy", y(d), 0)} r="2.5" fill="white"></circle>`;
  })}</g></svg>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let data = d3.ticks(-2, 2, 200).map(Math.sin);
  return `  <div>${validate_component(LinePlot, "LinePlot").$$render($$result, { data }, {}, {})}</div>`;
});
export {
  Page as default
};
