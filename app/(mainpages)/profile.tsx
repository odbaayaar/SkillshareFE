import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useUser } from '@clerk/clerk-expo';
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

const GET_USER = gql`
  query Query($id: ID) {
    getUser(id: $id) {
      profilePicture
      lastName
      id
      firstName
      emailAddress
      role
      username
    }
  }
`;
const UPDATE_USER = gql`
  mutation Mutation($input: UserUpdateInput!) {
    updateUser(input: $input) {
      id
      profilePicture
      lastName
      firstName
      emailAddress
      role
      username
    }
  }
`;

export default function Profile(): React.ReactNode {
  const { user } = useUser();
  // const [image, setImage] = useState<ImagePicker.ImagePickerAsset | undefined>();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [getUser, { data, loading, error }] = useLazyQuery(GET_USER, {
    variables: { id: user?.id },
  });
  const [updateUser, { data: updatedData, loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_USER);

  useEffect(() => {
    if (user) {
      getUser();
    } else {
      console.log('logged out');
    }
    console.log('user got updated');
  }, [updatedData, user]);

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  if (error) return <Text>{error.message}</Text>;

  if (!status || !status.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Grant access to camera</Text>
        <Button title="Grant" onPress={() => requestPermission} />
      </View>
    );
  }
  const pickImage = async (): Promise<void> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      // setImage(result.assets[0]);
      updateUser({
        variables: {
          input: {
            id: user?.id,
            profilePicture: result.assets[0].uri,
            lastName: undefined,
            firstName: undefined,
            emailAddress: undefined,
            role: undefined,
          },
        },
      });
    }
    console.log(updatedData, updateError, updateLoading);
  };
  const captureImage = async (): Promise<void> => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      // setImage(result.assets[0]);
      updateUser({
        variables: {
          input: {
            id: user?.id,
            profilePicture: result.assets[0].uri,
            lastName: undefined,
            firstName: undefined,
            emailAddress: undefined,
          },
        },
      });
    }
  };

  return (
    <>
      <View
        style={
          updateLoading
            ? {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                margin: 120,
                marginTop: 300,
                marginLeft: 190,
                zIndex: 10,
              }
            : {
                display: 'none',
              }
        }>
        <ActivityIndicator size="large" color="#C2F56D" />
      </View>
      <View
        style={
          updateLoading
            ? {
                backgroundColor: 'rgba(0,0,0,0.5)',
                height: '100%',
                width: '100%',
                zIndex: 9,
                position: 'absolute',
              }
            : { display: 'none' }
        }>
        <Image />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <View
          style={{
            backgroundColor: '#608da2',
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 400,
            width: 250,
          }}>
          <TouchableOpacity
            onPress={() => {
              pickImage();
            }}
            style={{ marginBottom: 25 }}>
            <Text>Choose from gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              captureImage();
            }}
            style={{ marginBottom: 15 }}>
            <Text>Capture image</Text>
          </TouchableOpacity>
          <View>
            <View
              style={{
                height: 150,
                width: 150,
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 100,
              }}>
              <Image
                source={{ uri: String(data.getUser.profilePicture) }}
                style={{ width: '100%', height: '100%', borderRadius: 100 }}
              />
            </View>
          </View>
          <TextInput
            style={{
              width: 150,
              height: 25,
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 1,
              marginLeft: 10,
              marginTop: 20,
            }}
            placeholder={String(user?.firstName)}
            placeholderTextColor="gray"
          />
          <TextInput
            style={{
              width: 150,
              height: 25,
              backgroundColor: 'white',
              borderColor: 'black',
              borderWidth: 1,
              marginLeft: 10,
              marginTop: 10,
            }}
            placeholder={String(user?.lastName)}
            placeholderTextColor="gray"
          />
          <TouchableOpacity
            // onPress={() => {
            //   pickImage();
            // }}
            style={{ marginBottom: 25 }}>
            <Text>Change</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
