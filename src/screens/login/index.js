import * as S from './styles'
import DefaultButton from '../../components/button';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import financesApi from '../../utils/api';
import { getObjectFromStorage, getStringFromStorage, storeData } from '../../utils/storage';

export default function Login({ navigation }) {
    const { register, setValue, handleSubmit } = useForm();

    useEffect(() => {
        register('email');
        register('password');
    }, [register])

    const handleLogin = async (data) => {
        try {
            const body = {
                email: data.email,
                password: data.password
            }

            const response = await financesApi.post('/authenticate', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const userInfos = response.data
            await storeData('@user_info', userInfos)
            await storeData('@user_info_id', userInfos.id)

            navigation.navigate('Drawer')
        } catch (error) {
            console.log(error)
        }
    }

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