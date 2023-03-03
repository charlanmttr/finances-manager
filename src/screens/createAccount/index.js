import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import * as S from './styles'
import DefaultButton from '../../components/button';

import financesApi from '../../utils/api';
import { storeData } from '../../utils/storage';

export default function CreateAccount({ navigation }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const { register, setValue, handleSubmit } = useForm();

  useEffect(() => {
    setTimeout(() => setErrorMessage(null), 10000)
  }, [errorMessage])

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
      setErrorMessage(message);
    }
  }

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
        />

        <S.DescriptionLabel>E-mail</S.DescriptionLabel>
        <S.TextArea
          placeholder={"Digite o seu email"}
          onChangeText={text => setValue('email', text)}
        />

        <S.DescriptionLabel>Senha</S.DescriptionLabel>
        <S.TextArea
          placeholder={"Digite a sua senha"}
          onChangeText={text => setValue('password', text)}
        />

        {errorMessage
          && <S.ErrorArea>
            <S.ErrorLabel>Ops! Ocorreu algum erro. Info: {errorMessage}</S.ErrorLabel>
          </S.ErrorArea>
        }

        <DefaultButton
          text={"Cadastrar"}
          handleMethod={handleSubmit(registerUser)}
        />
      </S.Form>
    </S.Container>
  );
}