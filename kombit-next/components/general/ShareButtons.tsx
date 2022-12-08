import {
	FacebookIcon,
	FacebookShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	TwitterIcon,
	TwitterShareButton,
} from "react-share";

export default function ShareButtons() {
	return (
		<div className="shareButtons some-icons">
			<FacebookShareButton
				quote="Se denne seje artikel!"
				hashtag="Kombit"
				url={
					typeof window !== "undefined"
						? window.location.origin + window.location.pathname
						: ""
				}
				children={<FacebookIcon />}
			/>
			<TwitterShareButton
				children={<TwitterIcon />}
				url={
					typeof window !== "undefined"
						? window.location.origin + window.location.pathname
						: ""
				}
			/>
			<LinkedinShareButton
				children={<LinkedinIcon />}
				url={
					typeof window !== "undefined"
						? window.location.origin + window.location.pathname
						: ""
				}
			/>
		</div>
	);
}
