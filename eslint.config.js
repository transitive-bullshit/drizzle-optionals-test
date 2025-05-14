import { config } from '@fisch0920/config/eslint'
import drizzle from 'eslint-plugin-drizzle'

export default [
  ...config,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      drizzle
    },
    rules: {
      ...drizzle.configs.recommended.rules,
      'no-process-env': 'off'
    }
  }
]
