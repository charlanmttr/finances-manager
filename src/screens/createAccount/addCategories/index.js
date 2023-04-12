import React, { useContext, useState } from 'react';

import Toast from 'react-native-toast-message';
import DefaultButton from '../../../components/button';
import { AuthContext } from '../../../context/authentication';
import financesApi from '../../../utils/api';

import * as S from './styles'

export default function AddCategories({ route, navigation }) {
    const { user } = route.params;

    const [selectedExpenses, setSelectedExpense] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState([]);
    const [isFirstClick, setFirstClick] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const { saveUserOnStorage } = useContext(AuthContext);

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

    const showToast = (type, text1, autoHide, visibilityTime, options = {}) => {
        Toast.show({
            type,
            text1,
            autoHide,
            visibilityTime,
            ...options,
        });
    }

    const handleRegister = async () => {
        try {
            setLoading(true)

            if (selectedExpenses.length !== 0 || selectedEntry.length !== 0) {
                await addCategories()

                const waitTime = 2000;

                showToast('success', 'Categorias cadastradas com sucesso!', true, waitTime, {
                    onHide: transitionMethod(waitTime)
                })
            } else if (isFirstClick) {
                showToast('info', 'Deseja continuar?', true, 4000, {
                    text2: 'Adicionar categorias agora facilitará no uso do app depois.',
                })

                setFirstClick(false)
                setLoading(false)
                return
            } else {
                transitionMethod(1000);
            }
        } catch (error) {
            console.log(error)

            showToast('error', 'Ops! Ocorreu algum erro. Tente novamente', true, 4000)
        }
    }

    const transitionMethod = (ms) => {
        setInterval(() => {
            saveUserOnStorage(user)
            setLoading(false)
        }, ms);
    }

    const addCategories = async () => {
        const expenses = selectedExpenses.map(category => ({
            name: category,
            isSpent: true,
        }))

        const entries = selectedEntry.map(category => ({
            name: category,
            isSpent: false,
        }))

        const categories = [...expenses, ...entries]

        return await financesApi.post('/createAccount/categories', {
            userId: user.id,
            categories
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
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
                    text={"Avançar"}
                    isWaiting={isLoading}
                    handleMethod={() => handleRegister(selectedExpenses, selectedEntry)}
                />
            </S.Form>
            <Toast position='bottom' />
        </S.Container>
    );
}