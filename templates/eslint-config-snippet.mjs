import { tameAgentSvgPlugin } from "./eslint-rules/index.mjs";

// Example ESLint flat config snippet
export default [
  // ... other configs ...
  {
    plugins: {
      "tame-agent-svg": tameAgentSvgPlugin
    },
    rules: {
      // Warn when a raw <svg> JSX element appears outside the configured icons directory
      "tame-agent-svg/no-raw-inline-svg": [
        "warn",
        {
          "iconsDir": "src/components/ui/icons/"
        }
      ],
      // Error when a <svg> JSX element lacks required accessibility attributes
      "tame-agent-svg/svg-aria-required": "error"
    }
  }
];
