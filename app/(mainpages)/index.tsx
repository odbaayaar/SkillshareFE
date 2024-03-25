import { useUser } from '@clerk/clerk-expo';
import { Text, View } from 'react-native';

export default function HomePage(): React.ReactNode {
  const { user } = useUser();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Classes you recently attended:</Text>
    </View>
  );
}
