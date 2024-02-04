import { useState } from "react";
import PodcastCard from "../podcastCard/PodcastCard";

import styles from './latest.module.css';

interface Podcast {
    _id: number;
    name: string;
    description: string;
    image: string;
}

interface PodcastCardProps {
    latestPodcasts: Podcast[];
}

const Latest: React.FC<PodcastCardProps> = ({ latestPodcasts }) => {
    const [hoveredPodcast, setHoveredPodcast] = useState<Podcast | null>(null);

    const firstPodcast = latestPodcasts[0];
    const secondPodcast = latestPodcasts[1];
    const thirdPodcast = latestPodcasts[2];

    const handleMouseEnter = (podcast: Podcast) => {
        setHoveredPodcast(podcast);
    };

    const handleMouseLeave = () => {
        setHoveredPodcast(null);
    };

    return (
        <div className={styles['latest-container']}>
            <h2>Latest Podcast</h2>
            <div className={styles['podcast-container']}>
                <div>
                    <PodcastCard key={firstPodcast._id} podcast={firstPodcast} />
                </div>
                <div>
                    <div
                        className={styles['image-container']}
                        onMouseEnter={() => handleMouseEnter(secondPodcast)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {hoveredPodcast === secondPodcast &&
                            <PodcastCard key={secondPodcast._id} podcast={secondPodcast} />
                        }
                        {hoveredPodcast === null &&
                            <>
                                <img className={styles['podcast-image']} src={secondPodcast.image}></img>
                                <p className={styles['podcast-name']}>{secondPodcast.name}</p>
                            </>
                        }
                    </div>

                    <div
                        className={styles['image-container']}
                        onMouseEnter={() => handleMouseEnter(thirdPodcast)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {hoveredPodcast === thirdPodcast &&
                            <PodcastCard key={thirdPodcast._id} podcast={thirdPodcast} />
                        }
                        {hoveredPodcast === null &&
                            <>
                                <img className={styles['podcast-image']} src={thirdPodcast.image}></img>
                                <p className={styles['podcast-name']}>{thirdPodcast.name}</p>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Latest;