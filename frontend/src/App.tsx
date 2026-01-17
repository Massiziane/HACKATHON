
import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
//import './App.css';
import {MainContent} from "./components/MainContent.tsx";
import './assets/CSS/styleindex.css';

function App() {
				const [count, setCount] = useState(0)

				return (
								<>
												<div>
																<MainContent>
																				<h1 className="center">Test</h1>
																</MainContent>
												</div>
								</>
				)
}

export default App;
