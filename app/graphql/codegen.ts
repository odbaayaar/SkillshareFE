import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://shareskill-be.vercel.app/api/graphql',
  documents: ['./app/graphql/documents/**/*.graphql'],
  generates: {
    './app/graphql/generated/index.ts': {
      overwrite: true,
      plugins: [
        'typescript',
        'typescript-resolvers',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
