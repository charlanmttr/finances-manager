import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import Router from './src/navigation';
import { AuthProvider } from './src/context/authentication';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

registerRootComponent(App);