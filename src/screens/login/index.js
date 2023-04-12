import * as S from './styles'
import DefaultButton from '../../components/button';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authentication';

import Toast from 'react-native-toast-message';

export default function Login({ navigation }) {
    const { register, setValue, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const { handleLogin, loginErrorMessage, isWaitingLogin } = useContext(AuthContext);

    useEffect(() => {
        if (loginErrorMessage) {
            Toast.show({
                type: 'error',
                text1: loginErrorMessage,
                visibilityTime: 3000,
                autoHide: true
            })
        }
    }, [loginErrorMessage])

    useEffect(() => {
        register('email');
        register('password');
    }, [register])

    return (
        <S.Container>
            <S.Form>
                <S.DescriptionLabel>E-mail</S.DescriptionLabel>
                <S.TextArea
                    placeholder={"Digite seu email"}
                    onChangeText={text => setValue('email', text)}
                    autoComplete={"email"}
                    inputMode={"email"}
                />

                <S.DescriptionLabel>Senha</S.DescriptionLabel>
                <S.TextArea
                    placeholder={"Digite sua senha"}
                    onChangeText={text => setValue('password', text)}
                    secureTextEntry={true}
                />

                <S.InvisibleButton
                    onPress={() => navigation.navigate('CreateAccount')}
                    activeOpacity={0.5}
                >
                    <S.LinkingLabel>Não tem uma conta? Criar agora.</S.LinkingLabel>
                </S.InvisibleButton>

                <DefaultButton
                    text={"Logar"}
                    isWaiting={isWaitingLogin}
                    handleMethod={handleSubmit(handleLogin)}
                />
            </S.Form>
            <Toast position='bottom'  />
        </S.Container>
    );
}