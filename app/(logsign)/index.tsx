import { useSignUp } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import { router } from 'expo-router';
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

export default function StackOneScreen(): React.ReactNode {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  const onSignUpPress = async (): Promise<void> => {
    if (!isLoaded) {
      return;
    }

    try {
      // Create the user on Clerk
      await signUp.create({
        firstName,
        lastName,
        username,
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  const onPressVerify = async (): Promise<void> => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      console.log(completeSignUp);
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
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
          <Text style={{ fontSize: 36 }}>Learn</Text>
          <Text style={{ fontSize: 36 }}>with</Text>
          <Text style={{ fontSize: 36 }}>us</Text>
        </View>
        <Pressable onPress={() => router.push('/(logsign)/login')}>
          <Text style={{ fontWeight: 'bold', marginTop: 75, marginRight: 40 }}> Login </Text>
        </Pressable>
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
          }}>
          <TextInput
            style={{
              width: 150,
              height: 50,
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 1,
              marginRight: 40,
            }}
            placeholder="First name"
            placeholderTextColor="gray"
            onChangeText={(firstName) => setFirstName(firstName)}
          />
          <TextInput
            style={{
              width: 150,
              height: 50,
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 1,
              marginLeft: 10,
            }}
            placeholder="Last name"
            placeholderTextColor="gray"
            onChangeText={(lastName) => setLastName(lastName)}
          />
        </View>
        <TextInput
          style={{
            width: 350,
            height: 50,
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: 1,
            marginTop: 20,
          }}
          placeholder="Username"
          placeholderTextColor="gray"
          onChangeText={(username) => setUsername(username)}
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
            onSignUpPress();
          }}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#C2F56D',
              flexDirection: 'row',
              width: 350,
              height: 50,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 1,
              marginTop: 15,
            }}>
            <Text style={{ fontSize: 14 }}>Signup</Text>
          </View>
        </TouchableOpacity>
        {pendingVerification && (
          <View>
            <TextInput
              style={{
                width: 350,
                height: 50,
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 1,
                marginTop: 20,
              }}
              value={code}
              placeholder="Code"
              placeholderTextColor="gray"
              onChangeText={(code) => setCode(code)}
            />
            <TouchableOpacity
              onPress={() => {
                onPressVerify();
              }}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#C2F56D',
                  flexDirection: 'row',
                  width: 350,
                  height: 50,
                  borderColor: 'black',
                  borderStyle: 'solid',
                  borderWidth: 1,
                  marginTop: 15,
                }}>
                <Text style={{ fontSize: 14 }}>Verify</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
