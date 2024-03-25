import { gql, useLazyQuery } from '@apollo/client';
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
    }
  }
`;

export const Header: React.FC = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useAuth();
  const [getUser, { data, loading, error }] = useLazyQuery(GET_USER, {
    variables: { id: user?.id },
  });
  if (loading) console.log('loading...');
  if (error) console.error(error.message);
  console.log(data);

  useEffect(() => {
    if (user) {
      getUser();
    } else {
      console.log('logged out');
    }
  }, [user]);

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
                  paddingLeft: 30,
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
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              {user?.firstName} {user?.lastName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              signOut();
            }}>
            <Text>Log out</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
