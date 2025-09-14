import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// @ts-expect-error -- side effects import
import "vuetify/styles";

const theme = {
  dark: false,
  colors: {
    background: "#F3F4F6",
    surface: "#FFFFFF",
    primary: "#FF6EA1",
    secondary: "#5E97F6",
    "primary-darken-1": "#E56290",
    "secondary-darken-1": "#3C6EBE",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "theme",
    themes: {
      theme,
    },
  },
});

export default vuetify;
