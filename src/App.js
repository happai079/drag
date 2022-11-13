import styled from 'styled-components';
import Carousel from './components/Carousel';
import Drag from './components/Drag';

function App() {
	return (
		<AppContainer>
			<Drag />
			<Carousel />
		</AppContainer>
	);
}

const AppContainer = styled.div`
	height: 100vh;
	margin: 0 auto;
`;

export default App;
