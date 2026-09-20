import globals from 'globals';

// Deliberately minimal: this is an art project, not a codebase that wants
// style policing. The point is to catch the class of mistake that actually
// bites here — a typo'd identifier or a stale import across 27 hand-wired
// entry points — without drowning 16k lines of existing code in warnings.
export default [
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    rules: {
      'no-undef': 'error',
      // `catch (e) {}` with an ignored binding is used deliberately throughout
      // (storage access, autoplay rejections), so don't flag those.
      'no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none', varsIgnorePattern: '^_' }],
      'no-dupe-keys': 'error',
      'no-dupe-class-members': 'error',
      'no-unreachable': 'error',
      'no-const-assign': 'error',
      'no-self-assign': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
    },
  },
  {
    // vendored/third-party copies under public/ aren't ours to lint
    ignores: ['dist/**', 'public/**', 'node_modules/**'],
  },
];
