import { Carousel } from "react-bootstrap";
import { BannerImage, BannerVideo } from "../../interfaces/banner";

export default function WPFrontBanner(props: any) {
	return (
		<>
			<Carousel interval={10000} fade={true} indicators={false}>
				{props.banners &&
					props.banners.length > 0 &&
					props.banners.map((banner: BannerImage | BannerVideo, i: number) => {
						return (
							<Carousel.Item key={i}>
								<img
									className="d-block w-100"
									src={banner.media}
									alt={banner.title}
								/>
								<Carousel.Caption>
									<div className="bannerCaptionBox">
										<h3>{banner.title}</h3>
									</div>
								</Carousel.Caption>
							</Carousel.Item>
						);
					})}
			</Carousel>
		</>
	);
}
