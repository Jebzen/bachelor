import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'hesye9',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
