
import {useState, React} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './assets/CSS/styleindex.css';
import {MainContent} from "./components/MainContent.tsx";
import {Menu} from "./components/Menu.tsx";
import {Routes, Route} from "react-router-dom";
//import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import CataloguePage from "./pages/CataloguePage.jsx";
import PathDetailPage from "./pages/PathDetailPage.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
				const [count, setCount] = useState(0);
				/*
					* Aucune des pages de Saad ne compile et render.
					* L'application est pr/sentement incapable d'utiliser ses pages
					* 
																				<Routes>
																								<Route path="/" element={<HomePage />} />
																								<Route path="/auth" element={<AuthPage />} />
																								<Route path="/catalogue" element={<CataloguePage />} />
																								<Route path="/parcours/:id" element={<PathDetailPage />} />
																								<Route path="*" element={<NotFound />} />
																				</Routes>
					*/
				return (
								<>
												<nav className="navBar">
																<Menu>
																</Menu>
												</nav>
												<div>
																<MainContent>
																				<h1>Test</h1>
																</MainContent>
												</div>
								</>
				);
}

export default App;
