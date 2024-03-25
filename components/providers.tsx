import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ClerkProvider } from '@clerk/clerk-expo';
// import * as SecureStore from 'expo-secure-store';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

// const tokenCache = {
//   async getToken(key: string) {
//     try {
//       return SecureStore.getItemAsync(key);
//     } catch (err) {
//       return null;
//     }
//   },
//   async saveToken(key: string, value: string) {
//     try {
//       return SecureStore.setItemAsync(key, value);
//     } catch (err) {
//       return;
//     }
//   },
// };

const PUBLISHABLE_KEY = `${process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}`;
const client = new ApolloClient({
  uri: 'https://shareskill-be.vercel.app/api/graphql',
  cache: new InMemoryCache(),
});

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ApolloProvider client={client}>
        <View style={{ flex: 1, position: 'relative' }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {children}
          </KeyboardAvoidingView>
        </View>
      </ApolloProvider>
    </ClerkProvider>
  );
};
