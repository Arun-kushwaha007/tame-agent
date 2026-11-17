/**
 * eslint-plugin/index.mjs
 * 
 * Enforces tame-agent frontend and technical SEO governance standards:
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
 * 
 * 3. canonical-domain [problem]
 *    Enforces the Technical SEO Canonical Domain Mandate.
 *    Disallows naked non-canonical domain variants or protocol mismatches in string literals.
 *    Automatically fixes them to the configured canonical domain.
 */

/** Normalise a file path to forward-slash form for consistent matching. */
function toForwardSlash(p) {
  return (p || "").replace(/\\/g, "/");
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
// Rule 3: canonical-domain
// ---------------------------------------------------------------------------

const canonicalDomainRule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce canonical domain URLs and disallow naked or non-canonical domain variants.",
      recommended: true,
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          canonicalDomain: {
            type: "string", // e.g. "https://www.example.com"
          },
          disallowedPattern: {
            type: "string", // custom regex string
          },
          exemptPatterns: {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      prohibitedNonCanonical:
        "Prohibited non-canonical URL '{{url}}'. Technical SEO SOP requires canonical '{{canonicalDomain}}' or relative path '/...'.",
    },
  },
  create(context) {
    const filename = (context.getPhysicalFilename ? context.getPhysicalFilename() : context.getFilename?.()) ?? context.filename ?? "";
    const options = context.options[0] || {};
    const canonicalDomain = options.canonicalDomain || "https://www.example.com";

    let regex;
    if (options.disallowedPattern) {
      regex = new RegExp(options.disallowedPattern, "i");
    } else {
      try {
        const parsed = new URL(canonicalDomain);
        const host = parsed.hostname;
        if (host.startsWith("www.")) {
          const rootHost = host.slice(4).replace(/\./g, "\\.");
          regex = new RegExp(`(?:https?:\\/\\/)(?!www\\.)${rootHost}`, "i");
        } else {
          const rootHost = host.replace(/\./g, "\\.");
          regex = new RegExp(`(?:https?:\\/\\/)www\\.${rootHost}`, "i");
        }
      } catch {
        return {};
      }
    }

    const exempt = options.exemptPatterns || ["/tests/", "/eslint-rules/", "/eslint-plugin/", "proxy.ts", "middleware.ts"];
    const normFile = toForwardSlash(filename);
    if (exempt.some((p) => normFile.includes(p))) {
      return {};
    }

    function checkValue(node, rawText, valueText) {
      if (typeof valueText === "string" && regex.test(valueText)) {
        context.report({
          node,
          messageId: "prohibitedNonCanonical",
          data: { url: valueText, canonicalDomain },
          fix(fixer) {
            const fixed = rawText.replace(regex, canonicalDomain);
            return fixer.replaceText(node, fixed);
          },
        });
      }
    }

    return {
      Literal(node) {
        if (typeof node.value === "string") {
          checkValue(node, node.raw, node.value);
        }
      },
      TemplateLiteral(node) {
        for (const quasi of node.quasis) {
          if (regex.test(quasi.value.raw)) {
            context.report({
              node: quasi,
              messageId: "prohibitedNonCanonical",
              data: { url: quasi.value.raw, canonicalDomain },
              fix(fixer) {
                const fixed = quasi.value.raw.replace(regex, canonicalDomain);
                return fixer.replaceText(quasi, fixed);
              },
            });
          }
        }
      },
    };
  },
};

// ---------------------------------------------------------------------------
// Plugin export (ESLint flat-config compatible)
// ---------------------------------------------------------------------------

export const tameAgentPlugin = {
  meta: { name: "tame-agent", version: "1.1.0" },
  rules: {
    "no-raw-inline-svg": noRawInlineSvgRule,
    "svg-aria-required": svgAriaRequiredRule,
    "canonical-domain": canonicalDomainRule,
  },
};

export const tameAgentSvgPlugin = tameAgentPlugin;
export const helpingAgentSvgPlugin = tameAgentPlugin;
export default tameAgentPlugin;
