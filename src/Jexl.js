import jexl from "jexl";

function _eval(expr, context) {
  expr = expr.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const [key, value] of Object.entries(context)) {
    context[key] = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  return jexl.evalSync(expr, context);
}

const Jexl = {
  eval: _eval
};

export default Jexl;
