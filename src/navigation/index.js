import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../context/authentication';
import LoadingScreen from '../screens/loadingScreen';
import AuthRoutes from './AuthRoutes';
import SignInRoutes from './SignInRoutes';

export default function Router() {
  const { userInfo, authInProgress } = useContext(AuthContext);

  if(authInProgress){
    return(
      <LoadingScreen />
    )
  }else {
    return (
      <NavigationContainer>
        {
          userInfo
            ? <AuthRoutes />
            : <SignInRoutes />
        }
      </NavigationContainer>
  );
  }


}