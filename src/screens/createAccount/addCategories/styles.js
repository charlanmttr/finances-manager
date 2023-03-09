import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: #FFF;
  flex: 1;
  align-items: center;
`

export const Form = styled.View`
    background-color: #FFF;
    width: 80%;
    padding: 8px;
`

export const DescriptionLabel = styled.Text`
  color: #009999;
  font-size: 18px;
  margin: 4px 0px;
`

export const Title = styled.Text`
  color: #009999;
  font-weight: bold;
  font-size: 18px;
  margin: 4px 0px;
`
export const CategoryArea = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px 0px;
`

export const CategoryItem = styled.TouchableOpacity`
  background-color: ${props => props.selected ? '#009999' : '#e5f4f4'}; 
  padding: 8px 10px;
  border-radius: 10px;
  margin: 0px 7px 7px 0px;
`

export const CategoryLabel = styled.Text`
  font-size: 20px;
  color: ${props => props.selected ? '#e5f4f4' : '#009999'};
`