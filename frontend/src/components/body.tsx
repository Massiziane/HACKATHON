
import {useState, React} from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


/*
	* This allows us to put children elements inside of our prop, making it more modular and speeding up development time.
	* By writing the children as "children?", we make the children optional.
	* If we write the children as "children", they are mandatory.
*/
type Props = {
				children?: React.ReactNode;
};

//
export const = Body({children}: Props) => {
				const [count, setCount] = useState(0)

				return (
								<>
												<div className="center">
																<div id="contenu">
																				<div className="left contenu">
																								{children}
																				</div>
																</div>
												</div>
								</>
				)
}

export default App

