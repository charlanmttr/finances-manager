import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

export const InvisibleButton = styled.TouchableOpacity``

export const ButtonArea = styled.View`
    background-color: #009999;;
    padding: 10px;
    margin: 10px 0px;
    border-radius: 6px;
    height: 48px;
    justify-content: center;
`

export const ButtonLabel = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
`

export default function DefaultButton({ handleMethod, text, isWaiting }) {    
    return (
        <InvisibleButton
            onPress={handleMethod}
        >
            <ButtonArea>
                {isWaiting
                    ? <ActivityIndicator size="small" color="#FFF" />
                    : <ButtonLabel>{text}</ButtonLabel>
                }

            </ButtonArea>
        </InvisibleButton>
    )
}