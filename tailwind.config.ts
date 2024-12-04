import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#4D67DF",
        warning: "#EAB000",
        danger: "#E44646",
        confirm: "#52B82A",
        "dark-gray": "#161616",
        "medium-gray": "#646464",
        "light-gray": "#B4B4B4",
        "off-white": "#F5F5F5",
        "primary-hover": "#6987DF",
        "warning-hover": "#EBCE79",
        "danger-hover": "#FF7A7A",
        "confirm-hover": "#92D877",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
