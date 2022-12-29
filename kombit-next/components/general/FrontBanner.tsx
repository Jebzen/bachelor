import { Carousel } from "react-bootstrap";
import { BannerImage, BannerVideo } from "../../interfaces/banner";

interface prop {
	banners: BannerImage[] | BannerVideo[];
}

export default function FrontBanner({ banners, themeDark }: prop) {
	//console.log("Banners", banners);
	return (
		<>
			<Carousel interval={10000} fade={true} indicators={false}>
				{banners &&
					banners.length > 0 &&
					banners.map((banner: BannerImage | BannerVideo, i: number) => {
						return (
							<Carousel.Item key={i}>
								{!themeDark ? (
									<img
										className="d-block w-100"
										src={banner.media}
										alt={banner.title}
									/>
								) : null}
								<div className="overlay"></div>
								<div className="arrowdiv">
									<a href="#slide">
										<span
											aria-hidden="true"
											className="carousel-control-next-icon"></span>
									</a>
								</div>
								{/* <Carousel.Caption> */}
								<div className="bannerCaptionBox">
									<h3>{banner.title}</h3>
									<p className="bannet-caption">
										Vi skaber konkurrence i det kommunale it-marked.
									</p>
								</div>
								{/* </Carousel.Caption> */}
							</Carousel.Item>
						);
					})}
			</Carousel>
		</>
	);
}
