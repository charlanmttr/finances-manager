import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../../context/authentication';

export default function Home() {
  const { userInfo, handleLogout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>{userInfo.id}</Text>
      <Text>{userInfo.name}</Text>
      <Text>{userInfo.email}</Text>
      <StatusBar style="auto" />
      <Button
        title='logout'
        onPress={() => handleLogout()}
      >
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
