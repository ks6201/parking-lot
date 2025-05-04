import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['./src/models/**/*.test.ts', './tests/**/*.test.ts', './tests/**/*.spec.ts'],
    exclude: ['node_modules/', 'dist/'],
    // setupFiles: ['./setup.vitest.ts'],
  },
});