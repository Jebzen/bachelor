import { Carousel } from "react-bootstrap";
import { BannerImage, BannerVideo } from "../../interfaces/banner";

interface prop {
  banners: BannerImage[] | BannerVideo[];
}

export default function FrontBanner({ banners }: prop) {
  //console.log("Banners", banners);
  return (
    <>
      <Carousel interval={10000} fade={true} indicators={false}>
        {banners &&
          banners.length > 0 &&
          banners.map((banner: BannerImage | BannerVideo, i: number) => {
            return (
              <Carousel.Item key={i}>
                <img
                  className="d-block w-100"
                  src={banner.media}
                  alt={banner.title}
                />
                <div className="overlay"></div>

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
