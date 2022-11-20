import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useEffect, useState } from "react";
import { client } from "./contenful/main";

type entry = {};

export default function SoMeFeed() {
	const [slide, setSlide] = useState("linkedin");
	const [linkedin, setLinkedin] = useState([]);
	const [presse, setPresse] = useState([]);
	const [kontakt, setKontakt] = useState([]);

	useEffect(() => {}, []);

	return (
		<div className="row">
			<div
				className={slide == "linkedin" ? "bg-info col-4" : "col-4"}
				onClick={() => setSlide("linkedin")}
			>
				LinkedIn
			</div>
			<div
				className={slide == "presse" ? "bg-info col-4" : "col-4"}
				onClick={() => setSlide("presse")}
			>
				Presse
			</div>
			<div
				className={slide == "kontakt" ? "bg-info col-4" : "col-4"}
				onClick={() => setSlide("kontakt")}
			>
				Kontakt
			</div>
			<div className="col-12">
				<div className="row">
					<div className="col-4"></div>
					<div className="col-4"></div>
					<div className="col-4"></div>
				</div>
			</div>
		</div>
	);
}
