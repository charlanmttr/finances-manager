import * as S from './styles'

export default function AddCategories({ route, navigation }) {
    const { userId } = route.params;

    return (
        <S.Container>
            <S.Form>
                <S.DescriptionLabel>Selecione as categorias que te interessam, posteriormente poderá adicionar outras.</S.DescriptionLabel>
                <S.DescriptionLabel>{userId}</S.DescriptionLabel>
            </S.Form>
        </S.Container>
    );
}