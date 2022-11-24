import { Carousel } from "react-bootstrap";
import { BannerImage, BannerVideo } from "../../interfaces/banner";

export default function WPFrontBanner(props: any) {
	return (
		<>
			<Carousel interval={10000} fade={true} indicators={false}>
				{props.banners &&
					props.banners.length > 0 &&
					props.banners.map((banner: any, i: number) => {
						return (
							<Carousel.Item key={i}>
								<img
									className="d-block w-100"
									src={banner.source_url}
									alt={banner.title.rendered}
								/>
								<Carousel.Caption>
									<div className="bannerCaptionBox">
										<h3>{banner.title.rendered}</h3>
									</div>
								</Carousel.Caption>
							</Carousel.Item>
						);
					})}
			</Carousel>
		</>
	);
}
