export const formatDuration = (time) => {
    const min = Math.floor((time % 3600) / 60);
    const sec = Math.floor((time % 3600) % 60);

    return `${min < 10 ? `0` : ``}${min}:${sec < 10 ? `0` : ``}${sec}`;
}