import { useState } from 'react';
import DefaultButton from '../../../components/button';
import financesApi from '../../../utils/api';
import * as S from './styles'

export default function AddCategories({ route, navigation }) {
    const { userId } = route.params;

    const [selectedExpenses, setSelectedExpense] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState([]);

    const expenseCategory = [
        'Despesas fixas',
        'Despesas extras',
        'Mercado',
        'Lazer',
    ];

    const entryCategory = [
        'Salario',
        'Extras'
    ]

    const saveCategories = async (selectedExpenses, selectedEntry) => {
        try {
            const expenses = selectedExpenses.map(category => ({
                name: category,
                isSpent: true,
            }))
    
            const entries = selectedEntry.map(category => ({
                name: category,
                isSpent: false,
            }))
    
            const categories = [...expenses, ...entries]

            const body = {
                userId,
                categories
            }
            
            const result = await financesApi.post('/createAccount/categories', body, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
      
            // navigation.navigate('AddCategories', { userId: userInfos.id });
          } catch (error) {
            const message = error.response.data.error;
            setErrorMessage(message);
          }
    }

    const handleCategorySelect = (category, type) => {
        if (type === 'expense') {
            const index = selectedExpenses.indexOf(category);

            if (index > -1) { // Se a categoria já foi selecionada, remova ela do array
                setSelectedExpense(selectedExpenses.filter(c => c !== category));
            } else {  // Se a categoria não foi selecionada, adicione ela ao array
                setSelectedExpense([...selectedExpenses, category]);
            }
        } else if (type === 'entry') {
            const index = selectedEntry.indexOf(category);

            if (index > -1) { // Se a categoria já foi selecionada, remova ela do array
                setSelectedEntry(selectedEntry.filter(c => c !== category));
            } else {  // Se a categoria não foi selecionada, adicione ela ao array
                setSelectedEntry([...selectedEntry, category]);
            }
        }
    }

    return (
        <S.Container>
            <S.Form>
                <S.DescriptionLabel>Selecione as categorias que te interessam, posteriormente poderá adicionar outras.</S.DescriptionLabel>
                <S.Title>Categorias de gasto:</S.Title>
                <S.CategoryArea>
                    {
                        expenseCategory.map((category, index) => (
                            <S.CategoryItem
                                key={index}
                                selected={selectedExpenses.includes(category)}
                                onPress={() => handleCategorySelect(category, 'expense')}
                            >
                                <S.CategoryLabel selected={selectedExpenses.includes(category)}>
                                    {category}
                                </S.CategoryLabel>
                            </S.CategoryItem>
                        ))
                    }
                </S.CategoryArea>
                <S.Title>Categorias de entrada de dinheiro:</S.Title>
                <S.CategoryArea>
                    {
                        entryCategory.map((category, index) => (
                            <S.CategoryItem
                                key={index}
                                selected={selectedEntry.includes(category)}
                                onPress={() => handleCategorySelect(category, 'entry')}
                            >
                                <S.CategoryLabel selected={selectedEntry.includes(category)}>
                                    {category}
                                </S.CategoryLabel>
                            </S.CategoryItem>
                        ))
                    }
                </S.CategoryArea>
                <DefaultButton
                    text={"Salvar"}
                    handleMethod={() => saveCategories(selectedExpenses, selectedEntry)}
                />
            </S.Form>
        </S.Container>
    );
}