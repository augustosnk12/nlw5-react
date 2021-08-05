import React, { ReactNode, useContext } from "react";
import { createContext } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  playPrevious: () => void;
  playNext: () => void;
  clearPlayerState: () => void;
  setPlayingState: (state: boolean) => void;
  playList: (episodes: Episode[], index: number) => void;
  isPlaying: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  isLooping: boolean;
  isShuffling: boolean;
};

type PlayerContextProviderProps = {
  children: ReactNode;
};

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = React.useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLooping, setIsLooping] = React.useState(false);
  const [isShuffling, setIsShuffling] = React.useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  /**
   * Pause or Play the episode
   */
  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  /**
   * Loop the podcast
   */
  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  /**
   * Make podcasts reproduce randomly
   */
  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  /**
   * Change playing state
   */
  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  /**
   * Plays the list of podcasts
   */
  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0;

  /**
   * Plays next podcast
   */
  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );

      console.log(nextRandomEpisodeIndex);

      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    }
    if (hasNext) setCurrentEpisodeIndex(currentEpisodeIndex + 1);
  }

  /**
   * Plays previous podcast
   */
  function playPrevious() {
    if (hasPrevious) setCurrentEpisodeIndex(currentEpisodeIndex - 1);
  }

  /**
   * Clear player state
   */
  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        playList,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        isLooping,
        isShuffling,
        clearPlayerState
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

//make able to access both PlayerContext and PlayerContextProvider
export const usePlayer = () => {
  return useContext(PlayerContext);
};
