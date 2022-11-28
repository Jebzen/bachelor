import { Carousel } from "react-bootstrap";
import { BannerImage, BannerVideo } from "../interfaces/banner";

export default function FrontBanner(props: any) {
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
                <div className="overlay"></div>
                <div className="arrowdiv">
                  <a href="#slide">
                    <span
                      aria-hidden="true"
                      className="carousel-control-next-icon"
                    ></span>
                  </a>
                </div>

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
