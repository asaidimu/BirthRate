module.exports = {
    daisyui: {
        themes: ["light", "business"]
    },
    plugins: [ require("@tailwindcss/typography"), require("daisyui")],
    content: [
        "./src/**/*.tsx",
        "./src/**/*.css",
        "./public/**/*.html",
        "./index.html",
    ],
    theme: {
        extend: {
            fontFamily: {
                ubuntu: "Ubuntu, sans-serif",
                abel: "Abel, sans-serif",
            },
            colors: {
                "theme-color-background": "#eeeeee",
                "theme-color-primary": "#ef4d3c",
                "theme-color-text": "#262626",
                "theme-color-accent": "#8c8b87",
            },
            minWidth: {
                "10": "2.5rem",
            },
        },
    },
};

    /* daisyui: {
        themes: [,
            {
                light: {
                    primary: "#ef4d3c",
                    secondary: "#d926a9",
                    accent: "#1fb2a6",
                    neutral: "#2a323c",
                    "base-100": "#1d232a",
                    info: "#3abff8",
                    success: "#36d399",
                    warning: "#fbbd23",
                    error: "#7f1d1d",
                },
                dark: {
                    primary: "#ef4d3c",
                    secondary: "#d926a9",
                    accent: "#1fb2a6",
                    neutral: "#2a323c",
                    "base-100": "#1d232a",
                    info: "#3abff8",
                    success: "#36d399",
                    warning: "#fbbd23",
                    error: "#7f1d1d",
                },
            },
        ],
    }, */
