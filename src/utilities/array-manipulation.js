export const isPresentInLikedVideos = (state, videoId) => {
  return state?.likedVideos?.videos?.find((item) => item.video._id == videoId);
};

export const isPresentInWatchHistory = (state, videoId) => {
  return state?.watchHistory?.videos?.find((item) => item.video._id == videoId);
};

export const isPresentInwatchLater = (state, videoId) => {
  return state?.watchLater?.videos?.find((item) => item.video._id == videoId);
};

export const isPresentInPlaylist = (playlist, video) => {
  return playlist?.videos?.find((item) => {
    return item.video._id == video._id;
  });
};
