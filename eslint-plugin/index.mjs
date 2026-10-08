/**
 * eslint-plugin/index.mjs
 * 
 * Enforces the tame-agent SVG-as-Component standard:
 * 
 * 1. no-raw-inline-svg [warn]
 *    Raw <svg> JSX elements must not appear outside a configurable icons directory.
 *    Default: src/components/ui/icons/
 *    Exception: files whose basename ends in -graphic.tsx or -chart.tsx
 * 
 * 2. svg-aria-required [error]
 *    Every <svg> element must carry EITHER:
 *      - aria-hidden="true" (decorative)
 *      - role="img" + aria-label="…" (meaningful)
 */

/** Normalise a file path to forward-slash form for consistent matching. */
function toForwardSlash(p) {
  return p.replace(/\\/g, "/");
}

/** Check if the file is inside the allowed icons directory. */
function isInsideIconsDir(filename, iconsDir) {
  return toForwardSlash(filename).includes(toForwardSlash(iconsDir));
}

/** Return true for permitted co-located animation-canvas exceptions. */
function isAnimationCanvasFile(filename) {
  const base = toForwardSlash(filename);
  return /-graphic\.[jt]sx?$/.test(base) || /-chart\.[jt]sx?$/.test(base);
}

// ---------------------------------------------------------------------------
// Rule 1: no-raw-inline-svg
// ---------------------------------------------------------------------------

const noRawInlineSvgRule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow raw <svg> JSX elements outside a specific directory.",
      recommended: true,
    },
    messages: {
      noRawSvg: "Raw <svg> element detected outside {{iconsDir}}. Extract this SVG into a named React component in {{iconsDir}} and import it here. Exception: files ending in -graphic.tsx or -chart.tsx (animation canvases)."
    },
    schema: [
      {
        type: "object",
        properties: {
          iconsDir: {
            type: "string",
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    // context.getPhysicalFilename() is for ESLint 9+ compatibility (fallback to legacy)
    const filename = (context.getPhysicalFilename ? context.getPhysicalFilename() : context.getFilename?.()) ?? context.filename ?? "";
    const options = context.options[0] || {};
    const iconsDir = options.iconsDir || "src/components/ui/icons/";

    if (isInsideIconsDir(filename, iconsDir) || isAnimationCanvasFile(filename)) {
      return {};
    }

    return {
      JSXOpeningElement(node) {
        const name = node.name.type === "JSXIdentifier" ? node.name.name : null;
        if (name === "svg") {
          context.report({ 
            node, 
            messageId: "noRawSvg",
            data: { iconsDir }
          });
        }
      }
    };
  }
};

// ---------------------------------------------------------------------------
// Rule 2: svg-aria-required
// ---------------------------------------------------------------------------

function getStringAttrValue(attr) {
  if (!attr) return null;
  const { value } = attr;
  if (!value) return null;
  if (value.type === "Literal") return String(value.value);
  if (value.type === "JSXExpressionContainer" && value.expression.type === "Literal") {
    return String(value.expression.value);
  }
  return null;
}

function findAttr(node, attrName) {
  return node.attributes.find(a => a.type === "JSXAttribute" && a.name.name === attrName);
}

const svgAriaRequiredRule = {
  meta: {
    type: "problem",
    docs: {
      description: "Every <svg> element must declare its accessibility intent.",
      recommended: true,
    },
    messages: {
      missingAriaHiddenOrRole: '<svg> is missing accessibility attributes. Add aria-hidden="true" for decorative SVGs, or role="img" aria-label="<description>" for meaningful icons.',
      missingAriaLabel: '<svg role="img"> is missing aria-label. Provide a short text description of what this icon communicates.',
    },
    schema: [],
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        const name = node.name.type === "JSXIdentifier" ? node.name.name : null;
        if (name !== "svg") return;

        const ariaHiddenAttr = findAttr(node, "aria-hidden");
        const roleAttr = findAttr(node, "role");
        const ariaLabelAttr = findAttr(node, "aria-label");

        const ariaHiddenVal = getStringAttrValue(ariaHiddenAttr);
        const roleVal = getStringAttrValue(roleAttr);

        const isDecorativeCorrect = ariaHiddenVal === "true";
        const hasRoleImg = roleVal === "img";

        const hasDynamicAriaHidden = ariaHiddenAttr && ariaHiddenAttr.value?.type === "JSXExpressionContainer" && ariaHiddenAttr.value.expression.type !== "Literal";
        const hasDynamicRole = roleAttr && roleAttr.value?.type === "JSXExpressionContainer" && roleAttr.value.expression.type !== "Literal";

        // Dynamic values cannot be statically analyzed, so we skip
        if (hasDynamicAriaHidden || hasDynamicRole) return;

        if (!isDecorativeCorrect && !hasRoleImg) {
          context.report({ node, messageId: "missingAriaHiddenOrRole" });
          return;
        }

        if (hasRoleImg && !ariaLabelAttr) {
          context.report({ node, messageId: "missingAriaLabel" });
        }
      }
    };
  }
};

// ---------------------------------------------------------------------------
// Plugin export (ESLint flat-config compatible)
// ---------------------------------------------------------------------------

export const tameAgentSvgPlugin = {
  meta: { name: "tame-agent-svg", version: "1.0.0" },
  rules: {
    "no-raw-inline-svg": noRawInlineSvgRule,
    "svg-aria-required": svgAriaRequiredRule,
  },
};

export const helpingAgentSvgPlugin = tameAgentSvgPlugin;
export default tameAgentSvgPlugin;
