import * as S from './styles'
import DefaultButton from '../../components/button';

export default function Login({ navigation }) {
    return (
        <S.Container>
            <S.Form>
                <S.DescriptionLabel>E-mail</S.DescriptionLabel>
                <S.TextArea />

                <S.DescriptionLabel>Senha</S.DescriptionLabel>
                <S.TextArea />

                <S.InvisibleButton
                    onPress={() => navigation.navigate('CreateAccount')}
                >
                    <S.LinkingLabel>Não tem uma conta? Criar agora.</S.LinkingLabel>
                </S.InvisibleButton>

                <DefaultButton
                    text={"Logar"}
                    handleMethod={() => navigation.navigate('CreateAccount')}
                />
            </S.Form>

        </S.Container>
    );
}