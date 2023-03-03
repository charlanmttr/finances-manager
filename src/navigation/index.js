import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackRoutes from './stackRoutes';

export default function Router() {
  return (
    <NavigationContainer>
        <StackRoutes />
    </NavigationContainer>
  );
}