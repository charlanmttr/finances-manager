import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import * as S from './styles'
import DefaultButton from '../../components/button';

import Toast from 'react-native-toast-message';

import financesApi from '../../utils/api';

export default function CreateAccount({ navigation }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const { register, setValue, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const registerUser = async (data) => {
    try {
      const { name, email, password } = data

      if ([name, email, password].includes("")) throw new Error("Preencha todos os campos.")

      const result = await financesApi.post('/users', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const { id } = result.data

      navigation.navigate('AddCategories', { user: {
          "id": id,
          "name": name,
          "email": email
        }});
    } catch (error) {
      if(error.response){
        setErrorMessage(error.response.data.error)
      }else {
        setErrorMessage(error.message)
      }
    }
  }

  useEffect(() => {
    if (errorMessage) {
      Toast.show({
        type: 'error',
        text1: errorMessage,
        visibilityTime: 3000,
        autoHide: true,
        onHide: setErrorMessage(null)
      })
    }
  }, [errorMessage])

  useEffect(() => {
    register('name');
    register('email');
    register('password');
  }, [register])

  return (
    <S.Container>
      <S.Form>
        <S.DescriptionLabel>Nome</S.DescriptionLabel>
        <S.TextArea
          placeholder={"Digite seu nome"}
          onChangeText={text => setValue('name', text)}
          inputMode={"text"}
          autoCapitalize={"words"}
        />

        <S.DescriptionLabel>E-mail</S.DescriptionLabel>
        <S.TextArea
          placeholder={"Digite o seu email"}
          onChangeText={text => setValue('email', text)}
          autoComplete={"email"}
          inputMode={"email"}
        />

        <S.DescriptionLabel>Senha</S.DescriptionLabel>
        <S.TextArea
          placeholder={"Digite a sua senha"}
          onChangeText={text => setValue('password', text)}
          secureTextEntry={true}
        />

        <DefaultButton
          text={"Cadastrar"}
          handleMethod={handleSubmit(registerUser)}
        />
      </S.Form>
      <Toast position='bottom' />
    </S.Container>
  );
}