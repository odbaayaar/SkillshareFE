import { Tabs } from 'expo-router';

const RootLayoutNav: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: '#608da2' },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'white',
      }}>
      <Tabs.Screen name="index" options={{ headerShown: false, tabBarLabel: 'Home' }} />
      <Tabs.Screen name="profile" options={{ headerShown: false, tabBarLabel: 'Me' }} />
    </Tabs>
  );
};

export default RootLayoutNav;
