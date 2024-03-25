import { RootStack } from './root-stack';

import { Header } from '@/components/header';

import { Providers } from '@/components/providers';

const RootLayoutNav: React.FC = () => {
  return (
    <>
      <Providers>
        <Header />
        <RootStack />
      </Providers>
    </>
  );
};

export default RootLayoutNav;
