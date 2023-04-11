import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function LoadingScreen() {
    return (
        <Container>
            <ActivityIndicator size="large" color="#009999" />
        </Container>
    )
}