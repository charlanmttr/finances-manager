import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import Router from './src/navigation';
import { AuthProvider } from './src/context/authentication';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <AuthProvider>
      <StatusBar hidden={true} />
      <Router />
    </AuthProvider>
  );
}

registerRootComponent(App);