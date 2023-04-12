import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import * as S from './styles'
import DefaultButton from '../../components/button';

import Toast from 'react-native-toast-message';

import financesApi from '../../utils/api';
import { storeData } from '../../utils/storage';

export default function CreateAccount({ navigation }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const { register, setValue, handleSubmit } = useForm();

  const registerUser = async (data) => {
    try {
      const body = {
        name: data.name,
        email: data.email,
        password: data.password
      }

      const result = await financesApi.post('/users', body, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const userInfos = result.data

      await storeData('@user_info', userInfos);
      await storeData('@user_info_id', userInfos.id);

      navigation.navigate('AddCategories', { userId: userInfos.id });
    } catch (error) {
      const message = error.response.data.error;

      setErrorMessage(`Ops! Ocorreu algum erro. Info: ${message}`);
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