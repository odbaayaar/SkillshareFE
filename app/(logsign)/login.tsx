import { useSignIn } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function StackTwoScreen(): React.ReactNode {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPress = async (): Promise<void> => {
    if (!isLoaded) {
      return;
    }

    try {
      console.log('SIGNED IN!!!');
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#DE886C',
        height: '100%',
        width: '100%',
      }}>
      <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 30,
            paddingTop: 20,
            marginTop: Constants.statusBarHeight,
          }}>
          <Text style={{ fontSize: 36 }}>Welcome back</Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40,
        }}>
        <Pressable>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              flexDirection: 'row',
              width: 350,
              height: 50,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 1,
              marginTop: 15,
            }}>
            <Image
              source={require('@/assets/images/google.png')}
              width={50}
              height={50}
              resizeMode="contain"
              style={{ height: 20, width: 20, marginLeft: 15 }}
            />
            <Text style={{ fontSize: 14, marginLeft: 75 }}>Continue with google</Text>
          </View>
        </Pressable>
        <Pressable>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              flexDirection: 'row',
              width: 350,
              height: 50,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 1,
              marginTop: 15,
            }}>
            <Image
              source={require('@/assets/images/facebook.png')}
              width={50}
              height={50}
              resizeMode="contain"
              style={{ height: 20, width: 20, marginLeft: 15 }}
            />
            <Text style={{ fontSize: 14, marginLeft: 72 }}>Continue with facebook</Text>
          </View>
        </Pressable>
        <Pressable>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              flexDirection: 'row',
              width: 350,
              height: 50,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 1,
              marginTop: 15,
            }}>
            <Image
              source={require('@/assets/images/apple.png')}
              width={50}
              height={50}
              resizeMode="contain"
              style={{ height: 40, width: 40, marginLeft: 5 }}
            />
            <Text style={{ fontSize: 14, marginLeft: 70 }}>Continue with apple</Text>
          </View>
        </Pressable>
        <View style={{ borderTopWidth: 1, borderTopColor: 'black', width: 350, marginTop: 25 }}>
          <View
            style={{
              display: 'flex',
              backgroundColor: '#DE886C',
              position: 'absolute',
              bottom: -7,
              left: 155,
              width: 40,
            }}>
            <Text
              style={{
                backgroundColor: '#DE886C',
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              Or
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 25,
            marginLeft: 0,
            display: 'flex',
            flexDirection: 'row',
          }}
        />
        <TextInput
          style={{
            width: 350,
            height: 50,
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 1,
            marginTop: 20,
          }}
          placeholder="Email address"
          placeholderTextColor="gray"
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput
          style={{
            width: 350,
            height: 50,
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 1,
            marginTop: 20,
          }}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity
          onPress={() => {
            onSignInPress();
          }}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#C2F56D',
              flexDirection: 'row',
              width: 350,
              height: 50,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 1,
              marginTop: 15,
            }}>
            <Image
              source={require('@/assets/images/email.png')}
              width={50}
              height={50}
              resizeMode="contain"
              style={{ height: 20, width: 20, marginLeft: 15 }}
            />
            <Text style={{ fontSize: 14, marginLeft: 70 }}>Continue with email</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
