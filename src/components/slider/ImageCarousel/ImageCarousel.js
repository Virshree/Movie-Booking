import React from "react";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";

function ImageCarousel(props) {
  const { images } = props;
  return (
    <div>
      <CCarousel controls indicators>
        {images.map((image, index) => {
          return (
            <CCarouselItem key={index}>
              <CImage
                className="d-block w-100"
                src={image}
                alt={`slide ${index + 1}`}
                height="320px"
              />
            </CCarouselItem>
          );
        })}
      </CCarousel>
    </div>
  );
}

export default ImageCarousel;
