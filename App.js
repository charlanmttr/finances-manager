import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import Router from './src/navigation';

export default function App() {
  return (
    <Router />
  );
}

registerRootComponent(App);