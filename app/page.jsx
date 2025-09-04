import Image from "next/image";
import EmblaCarousel from "./carousel";

export default function Home() {
    const OPTIONS = { axis: 'y', dragFree: true, loop: true }
const SLIDE_COUNT = 40
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

	return( <div className="h-screen">

    <div className="video-container">
					<video
						src="/Landscape.mp4"
						autoPlay
						loop
						muted
						playsInline
						preload="auto"
					/>
				</div>
     
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />

    </div>
    )
}