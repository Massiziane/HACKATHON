
import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './assets/CSS/styleindex.css';
import {MainContent} from "./components/MainContent.tsx";

function App() {
				const [count, setCount] = useState(0);

				return (
								<>
												<div>
																<MainContent>
																				<h1>Test</h1>
																</MainContent>
												</div>
								</>
				)
}

export default App
