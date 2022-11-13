import styled from 'styled-components';
import Drag from './components/Drag';

function App() {
	return (
		<AppContainer>
			<Drag />
		</AppContainer>
	);
}

const AppContainer = styled.div`
	height: 100vh;
	margin: 0 auto;
`;

export default App;
