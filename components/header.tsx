import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

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
const CREATE_USER = gql`
  mutation Mutation($input: UserCreateInput!) {
    createUser(input: $input) {
      id
      firstName
      lastName
      emailAddress
      profilePicture
      role
      username
    }
  }
`;

export const Header: React.FC = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useAuth();
  const [getUser, { data, loading, error }] = useLazyQuery(GET_USER, {
    variables: { id: user?.id },
  });
  const [createUser, { data: createdData, loading: createLoading, error: createError }] =
    useMutation(CREATE_USER);

  if (loading) console.log('loading...');
  if (error) console.error(error.message);
  console.log(data);

  useEffect(() => {
    if (user) {
      createUser({
        variables: {
          input: {
            emailAddress: user?.emailAddresses[0].emailAddress,
            firstName: user?.firstName,
            id: user?.id,
            lastName: user?.lastName,
            username: user?.username,
          },
        },
      });
      console.log(createdData, createLoading, createError);
    }
    if (!createLoading) {
      getUser();
    }
  }, [user, createdData]);

  return (
    <>
      {data !== true && (
        <View
          style={
            isLoaded && isSignedIn
              ? {
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                  height: 100,
                  backgroundColor: '#608da2',
                  display: 'flex',
                  paddingTop: 40,
                  paddingLeft: 20,
                  paddingRight: 15,
                }
              : {
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: 50,
                  backgroundColor: 'red',
                  display: 'none',
                }
          }>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Image
              source={{ uri: String(data?.getUser.profilePicture) }}
              style={{
                height: 50,
                width: 50,
                borderRadius: 100,
                borderWidth: 0.7,
                borderColor: 'black',
              }}
            />
            <Text style={{ fontWeight: 'bold' }}>
              {user?.firstName} {user?.lastName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              signOut();
            }}
            style={data?.getUser.role === '101' ? { display: 'none' } : { marginRight: 30 }}>
            <Text>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              signOut();
            }}>
            <Text style={{ color: 'red' }}>Log out</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
