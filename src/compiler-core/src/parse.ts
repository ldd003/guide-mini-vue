export function baseParse(content) {
  const context = createParseContext(content);
  return createRoot(parseChildren(context));
}
function createParseContext(content) {
  return {
    source: content,
  };
}
function createRoot(children) {
  return {
    children,
  };
}
function parseChildren(context) {
  const nodes = [];
  const node = parseInterpolation(context);
  nodes.push(node);
  return nodes;
}
function parseInterpolation(context) {
  const closeIndex = context.source.indexOf("}}", 2);
  context.source = context.source.slice(2);
  const rawContentLength = closeIndex - 2;
  const content = context.source.slice(0, rawContentLength);
  context.source = context.source.slice(rawContentLength + 2);
  console.log(123, context.source);
  return {
    type: "intepolation",
    content: {
      type: "simple_expression",
      content,
    },
  };
}
