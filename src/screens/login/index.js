import * as S from './styles'
import DefaultButton from '../../components/button';
import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authentication';

export default function Login({ navigation }) {
    const { register, setValue, handleSubmit } = useForm();
    const { handleLogin } = useContext(AuthContext);

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
                />

                <S.DescriptionLabel>Senha</S.DescriptionLabel>
                <S.TextArea
                    placeholder={"Digite sua senha"}
                    onChangeText={text => setValue('password', text)}
                />

                <S.InvisibleButton
                    onPress={() => navigation.navigate('CreateAccount')}
                >
                    <S.LinkingLabel>Não tem uma conta? Criar agora.</S.LinkingLabel>
                </S.InvisibleButton>

                <DefaultButton
                    text={"Logar"}
                    handleMethod={handleSubmit(handleLogin)}
                />
            </S.Form>
        </S.Container>
    );
}