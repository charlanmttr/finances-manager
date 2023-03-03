import styled from 'styled-components/native'

export const InvisibleButton = styled.TouchableOpacity``

export const ButtonArea = styled.View`
    background-color: #009999;;
    padding: 10px;
    margin: 10px 0px;
    border-radius: 6px;
`

export const ButtonLabel = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
`

export default function DefaultButton({handleMethod, text}) {
    return (
        <InvisibleButton
            onPress={handleMethod}
        >
            <ButtonArea>
                <ButtonLabel>{text}</ButtonLabel>
            </ButtonArea>
        </InvisibleButton>
    )
}