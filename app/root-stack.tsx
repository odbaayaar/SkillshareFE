import { SignedIn, useAuth } from '@clerk/clerk-expo';
import { Stack, router } from 'expo-router';
import { useEffect } from 'react';

export const RootStack = (): React.ReactNode => {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log('loaded');
      router.replace('/(mainpages)/');
    } else if (isSignedIn === false) {
      console.log('not loaded');
      router.replace('/(logsign)/');
    }
  }, [isSignedIn]);

  return (
    <>
      <SignedIn>
        {/* <View style={{ display: 'flex', alignItems: 'flex-start' }}>
          <SignOut />
        </View> */}
      </SignedIn>
      <Stack>
        <Stack.Screen name="(logsign)" options={{ headerShown: false }} />
        <Stack.Screen name="(mainpages)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};
