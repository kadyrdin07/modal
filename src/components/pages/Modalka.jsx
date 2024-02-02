import scss from "./Modalka.module.scss";
export const Modalka = ({ children }) => {
	return (
		<div className="container">
			<div className={scss.kodyrali}>{children}</div>
		</div>
	);
};
