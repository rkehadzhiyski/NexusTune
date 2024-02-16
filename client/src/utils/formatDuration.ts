export const formatDuration = (durationInSeconds: number) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}m` : `${minutes}m`;
    const formattedSeconds = seconds < 10 ? `0${seconds}s` : `${seconds}s`;
    return `${formattedMinutes}:${formattedSeconds}`;
};