import React, { Component } from 'react';
import map from 'lodash/map';
import { isEmpty } from 'ramda';

import * as Style from './NowPlayingStyles';
import * as Placeholder from './LoaderPlaceholders';
import ErrorPageContainer from '../ErrorPage/ErrorPageContainer';
import WebPlayerContainer from '../WebPlayer/WebPlayerContainer';
import SaveAnimationContainer from '../SaveAnimation/SaveAnimationContainer';
import NowPlayingLoader from './NowPlayingLoader';
import TracksGrid from '../TracksGrid/TracksGrid';
import SavePlaylistContainer from '../SavePlaylist/SavePlaylistContainer';
import { randomPicEndpoint, isLoading, playTrackReq, playTrackEndpoint } from './helpers';

class NowPlaying extends React.Component {
  state = {
    isLoaded: false
  };

  handleLoadedPic = () => {
    this.setState({ isLoaded: true });
  };

  playTrack = (idx = 0) => {
    const {
      deviceId,
      accessToken,
      currentPlaylist,
      setIsPlaying,
      setIsActivated,
      setCurrentTrack,
      setCurrentIdx
    } = this.props;

    const currentTrack = currentPlaylist[idx];

    fetch(playTrackEndpoint(deviceId), playTrackReq(currentTrack, accessToken));

    setCurrentIdx(idx);
    setCurrentTrack(currentTrack);
    setIsPlaying();
    setIsActivated();
  };

  renderTopFiveTrack = ({ album: { artists, images }, name }, idx) => (
    <Style.TrackWrapper onClick={() => this.playTrack(idx)} key={`${name}-${idx}`}>
      <div>
        <img alt="Album" src={images[2].url} />
      </div>
      <Style.Data>
        <div>{name}</div>
        <Style.ArtistName>{artists[0].name}</Style.ArtistName>
      </Style.Data>
    </Style.TrackWrapper>
  );

  render() {
    const { currentPlaylist, searchError } = this.props;
    const { isLoaded } = this.state;

    if (isLoading(isLoaded, currentPlaylist))
      return <NowPlayingLoader handleLoadedPic={this.handleLoadedPic} />;

    if (isEmpty(currentPlaylist)) return <ErrorPageContainer errorMsg={searchError} />;

    const currentPlaylistCopy = [...currentPlaylist]; // copy the array instead of mutating directly
    const topFiveTracks = currentPlaylistCopy.splice(0, 5);

    const tracks = map(topFiveTracks, this.renderTopFiveTrack);

    return (
      <div>
        <Style.Wrapper>
          <Style.ContentWrapper>
            <SaveAnimationContainer />
            <div>
              <Style.Picture>
                <SavePlaylistContainer />
                <Style.RandomPic alt="Random Pic" src={randomPicEndpoint} />
              </Style.Picture>
            </div>
            <div>
              <span>
                <span role="img" aria-label="Hallelujah">
                  🙌
                </span>{' '}
                Top 5 Songs
              </span>
              <Style.Tracks>{tracks}</Style.Tracks>
            </div>
          </Style.ContentWrapper>
        </Style.Wrapper>
        <Style.TracksGridWrapper>
          <TracksGrid playTrack={this.playTrack} allTracks={currentPlaylistCopy} />
        </Style.TracksGridWrapper>
        <WebPlayerContainer playTrack={this.playTrack} />
      </div>
    );
  }
}

export default NowPlaying;
