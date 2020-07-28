import React from "react";

const Footer = () => {
	const amplifiedUrl = "https://www.amplifiedbydesign.com/";
	const codeforpdxUrl = "https://www.codeforpdx.org/";
	let date = new Date();
	let currYear = date.getFullYear();

	let renderAnchor = (url, innerText) => (
		<a
			target="_blank"
			rel="noopener noreferrer"
			className="is-menu-link"
			href={url}
		>
			{innerText}
		</a>
	);

	return (
		<footer className="dashboard__footer">
			<p className="dashboard__footer_logo_text">
				<span className="bold">
					Made with love by {renderAnchor(amplifiedUrl, "Amplified By Design")}{" "}
					and {renderAnchor(codeforpdxUrl, "Code For PDX")}. Copyright ©{" "}
					{currYear}
				</span>
			</p>
		</footer>
	);
};

export default Footer;
