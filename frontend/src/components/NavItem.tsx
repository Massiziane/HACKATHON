
import {React} from "react";
import {Link} from "react-router-dom";


type Props = {
				children?: React.ReactNode;
};

export const NavItem = ({to, children: Props}) => {
				return (
								<Link to={to}>
												{children}
								</Link>
				);
};