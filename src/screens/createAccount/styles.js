import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: #FFF;
  flex: 1;
  padding-top: 20%;
  align-items: center;
`

export const Form = styled.View`
    background-color: #FFF;
    width: 80%;
    padding: 8px;
`

export const DescriptionLabel = styled.Text`
  color: #009999;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
`

export const TextArea = styled.TextInput`
  font-size: 18px;
  background-color: #e5f4f4;
  border: 1px;
  border-radius: 8px;
  border-color: #009999;
  padding: 8px;
  margin-bottom: 8px;
  color: #009999;
`

export const ErrorArea = styled.View`
  width: 100%;
  border: 1px;
  border-color: #f44336;
  background-color: #fab3ae;
  border-radius: 8px;
  padding: 8px;
`

export const ErrorLabel = styled.Text`
  color: #f44336;
  font-size: 15px;
`