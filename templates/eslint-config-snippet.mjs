import { tameAgentPlugin } from "./eslint-rules/index.mjs";

// Example ESLint flat config snippet
export default [
  // ... other configs ...
  {
    plugins: {
      "tame-agent": tameAgentPlugin,
    },
    rules: {
      // Warn when a raw <svg> JSX element appears outside the configured icons directory
      "tame-agent/no-raw-inline-svg": [
        "warn",
        {
          iconsDir: "src/components/ui/icons/",
        },
      ],
      // Error when an <svg> JSX element lacks required accessibility attributes
      "tame-agent/svg-aria-required": "error",
      // Enforce Technical SEO Canonical Domain Mandate
      "tame-agent/canonical-domain": [
        "error",
        {
          canonicalDomain: "https://www.example.com", // [CUSTOMIZE: Your preferred canonical origin]
        },
      ],
    },
  },
];
