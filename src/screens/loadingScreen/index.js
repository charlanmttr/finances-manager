import { ActivityIndicator } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function LoadingScreen() {
    return (
        <Container>
            <Svg height={50} width={50}>
                <Circle cx={25} cy={25} r={20} stroke="#FFF" strokeWidth={2.5} fill="none" />
            </Svg>
            <ActivityIndicator size="large" color="#FFF" style={{ position: 'absolute' }} />
        </Container>
    )
}