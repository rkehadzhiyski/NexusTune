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

const Latest: React.FC<PodcastCardProps> = ({latestPodcasts}) => {
    const firstPodcast = latestPodcasts[0];
    const secondPodcast = latestPodcasts[1];
    const thirdPodcast = latestPodcasts[2];
    
    return (
        <div>
            <div>
                <PodcastCard key={firstPodcast._id} podcast={firstPodcast}/>
            </div>
            <div>
                <div><img className={styles['second-podcast-image']} src={secondPodcast.image}></img></div>
                <div><img className={styles['third-podcast-image']} src={thirdPodcast.image}></img></div>
            </div>
        </div>
    );
}

export default Latest;