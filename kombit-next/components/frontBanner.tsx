import { Carousel } from "react-bootstrap";
import { BannerImage, BannerVideo } from "../json/mock/frontBanner";

export default function FrontBanner({ data }: any) {
	return (
		<>
			<Carousel>
				{data &&
					data.map((banner: BannerImage | BannerVideo, i: number) => {
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
