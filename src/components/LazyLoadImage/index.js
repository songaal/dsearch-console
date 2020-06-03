import {LazyLoadImage, trackWindowScroll} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import React from "react";


const Lazy = ({ image }) => (
    <div>
        <LazyLoadImage
            effect="blur"
            alt={image.alt}
            height={image.height}
            src={image.src}
            width={image.width}
            scrollPosition={window.scrollY}
            style={{maxWidth: image.maxWidth || '100%'}}
        />
    </div>
);

export default trackWindowScroll(Lazy);