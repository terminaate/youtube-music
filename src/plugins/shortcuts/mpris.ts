import { BrowserWindow, ipcMain } from 'electron';

import MprisPlayer, {
  LOOP_STATUS_NONE,
  LOOP_STATUS_PLAYLIST,
  LOOP_STATUS_TRACK,
  LoopStatus,
  PLAYBACK_STATUS_PAUSED,
  PLAYBACK_STATUS_PLAYING,
  PLAYBACK_STATUS_STOPPED,
  type PlayBackStatus,
  type PlayerOptions,
  type Position,
  Track,
} from '@jellybrick/mpris-service';

import registerCallback, {
  type SongInfo,
  SongInfoEvent,
} from '@/providers/song-info';
import getSongControls from '@/providers/song-controls';
import config from '@/config';
import { LoggerPrefix } from '@/utils';

import type { RepeatMode } from '@/types/datahost-get-state';
import type { QueueResponse } from '@/types/youtube-music-desktop-internal';

class YTPlayer extends MprisPlayer {
  /**
   * @type {number} The current position in microseconds
   * @private
   */
  private currentPosition: number;

  constructor(opts: PlayerOptions) {
    super(opts);

    this.currentPosition = 0;
  }

  setPosition(t: number) {
    this.currentPosition = t;
  }

  override getPosition(): number {
    return this.currentPosition;
  }

  setLoopStatus(status: LoopStatus) {
    this.loopStatus = status;
  }

  isPlaying(): boolean {
    return this.playbackStatus === PLAYBACK_STATUS_PLAYING;
  }

  isPaused(): boolean {
    return this.playbackStatus === PLAYBACK_STATUS_PAUSED;
  }

  isStopped(): boolean {
    return this.playbackStatus === PLAYBACK_STATUS_STOPPED;
  }

  setPlaybackStatus(status: PlayBackStatus) {
    this.playbackStatus = status;
  }
}

function setupMPRIS() {
  const instance = new YTPlayer({
    name: 'YoutubeMusic',
    identity: 'YouTube Music',
    supportedMimeTypes: ['audio/mpeg'],
    supportedInterfaces: ['player'],
  });

  instance.canRaise = true;
  instance.canQuit = false;
  instance.canUsePlayerControls = true;
  instance.supportedUriSchemes = ['http', 'https'];
  instance.desktopEntry = 'youtube-music';
  return instance;
}

function registerMPRIS(win: BrowserWindow) {
  const songControls = getSongControls(win);
  const {
    playPause,
    next,
    previous,
    setVolume,
    shuffle,
    switchRepeat,
    setFullscreen,
    requestShuffleInformation,
    requestFullscreenInformation,
    requestQueueInformation,
  } = songControls;
  try {
    let currentSongInfo: SongInfo | null = null;
    const secToMicro = (n: number) => Math.round(Number(n) * 1e6);
    const microToSec = (n: number) => Math.round(Number(n) / 1e6);

    const correctId = (videoId: string) => {
      return videoId.replace(/-/g, '_MINUS_');
    };

    const player = setupMPRIS();

    const seekTo = (event: Position) => {
      if (
        currentSongInfo?.videoId &&
        event.trackId.endsWith(correctId(currentSongInfo.videoId))
      ) {
        win.webContents.send('ytmd:seek-to', microToSec(event.position ?? 0));
        player.setPosition(event.position ?? 0);
      }
    };
    const seekBy = (offset: number) => {
      win.webContents.send('ytmd:seek-by', microToSec(offset));
      player.setPosition(player.getPosition() + offset);
    };

    ipcMain.on('ytmd:player-api-loaded', () => {
      win.webContents.send('ytmd:setup-seeked-listener', 'mpris');
      win.webContents.send('ytmd:setup-time-changed-listener', 'mpris');
      win.webContents.send('ytmd:setup-repeat-changed-listener', 'mpris');
      win.webContents.send('ytmd:setup-volume-changed-listener', 'mpris');
      win.webContents.send('ytmd:setup-shuffle-changed-listener', 'mpris');
      win.webContents.send('ytmd:setup-fullscreen-changed-listener', 'mpris');
      win.webContents.send('ytmd:setup-autoplay-changed-listener', 'mpris');
      requestShuffleInformation();
      requestFullscreenInformation();
      requestQueueInformation();
    });

    ipcMain.on('ytmd:seeked', (_, t: number) => {
      player.setPosition(secToMicro(t));
      player.seeked(secToMicro(t));
    });

    ipcMain.on('ytmd:repeat-changed', (_, mode: RepeatMode) => {
      switch (mode) {
        case 'NONE': {
          player.setLoopStatus(LOOP_STATUS_NONE);
          break;
        }
        case 'ONE': {
          player.setLoopStatus(LOOP_STATUS_TRACK);
          break;
        }
        case 'ALL': {
          player.setLoopStatus(LOOP_STATUS_PLAYLIST);
          // No default
          break;
        }
      }
      requestQueueInformation();
    });

    ipcMain.on('ytmd:shuffle-changed', (_, shuffleEnabled: boolean) => {
      if (player.shuffle === undefined || !player.canUsePlayerControls) {
        return;
      }

      player.shuffle = shuffleEnabled ?? !player.shuffle;
    });

    ipcMain.on('ytmd:fullscreen-changed', (_, changedTo: boolean) => {
      if (player.fullscreen === undefined || !player.canUsePlayerControls) {
        return;
      }

      player.fullscreen =
        changedTo !== undefined ? changedTo : !player.fullscreen;
    });

    ipcMain.on(
      'ytmd:set-fullscreen',
      (_, isFullscreen: boolean | undefined) => {
        if (!player.canUsePlayerControls || isFullscreen === undefined) {
          return;
        }

        player.fullscreen = isFullscreen;
      },
    );

    ipcMain.on(
      'ytmd:fullscreen-changed-supported',
      (_, isFullscreenSupported: boolean) => {
        player.canUsePlayerControls = isFullscreenSupported;
      },
    );
    ipcMain.on('ytmd:autoplay-changed', (_) => {
      requestQueueInformation();
    });

    ipcMain.on('ytmd:get-queue-response', (_, queue: QueueResponse) => {
      if (!queue) {
        return;
      }

      const currentPosition =
        queue.items?.findIndex(
          (it) =>
            it?.playlistPanelVideoRenderer?.selected ||
            it?.playlistPanelVideoWrapperRenderer?.primaryRenderer
              ?.playlistPanelVideoRenderer?.selected,
        ) ?? 0;
      player.canGoPrevious = currentPosition !== 0;

      let hasNext: boolean;
      if (queue.autoPlaying) {
        hasNext = true;
      } else if (player.loopStatus === LOOP_STATUS_PLAYLIST) {
        hasNext = true;
      } else {
        // Example: currentPosition = 0, queue.items.length = 29 -> hasNext = true
        hasNext = !!(currentPosition - (queue?.items?.length ?? 0 - 1));
      }

      player.canGoNext = hasNext;
    });

    player.on('loopStatus', (status: LoopStatus) => {
      // SwitchRepeat cycles between states in that order
      const switches = [
        LOOP_STATUS_NONE,
        LOOP_STATUS_PLAYLIST,
        LOOP_STATUS_TRACK,
      ];
      const currentIndex = switches.indexOf(player.loopStatus);
      const targetIndex = switches.indexOf(status);

      // Get a delta in the range [0,2]
      const delta = (targetIndex - currentIndex + 3) % 3;
      switchRepeat(delta);
    });

    player.on('raise', () => {
      if (!player.canRaise) {
        return;
      }

      win.setSkipTaskbar(false);
      win.show();
    });

    player.on('fullscreen', (fullscreenEnabled: boolean) => {
      setFullscreen(fullscreenEnabled);
    });

    player.on('play', () => {
      if (!player.isPlaying()) {
        player.setPlaybackStatus(PLAYBACK_STATUS_PLAYING);
        playPause();
      }
    });
    player.on('pause', () => {
      if (!player.isPaused()) {
        player.setPlaybackStatus(PLAYBACK_STATUS_PAUSED);
        playPause();
      }
    });
    player.on('playpause', () => {
      player.setPlaybackStatus(
        player.isPlaying() ? PLAYBACK_STATUS_PAUSED : PLAYBACK_STATUS_PLAYING,
      );
      playPause();
    });

    player.on('next', () => {
      next();
    });

    player.on('previous', () => {
      previous();
    });

    player.on('seek', seekBy);
    player.on('position', seekTo);

    player.on('shuffle', (enableShuffle) => {
      if (!player.canUsePlayerControls || enableShuffle === undefined) {
        return;
      }

      player.shuffle = enableShuffle;

      if (enableShuffle) {
        shuffle();
        requestQueueInformation();
      }
    });
    player.on('open', (args: { uri: string }) => {
      win.loadURL(args.uri).then(() => {
        requestQueueInformation();
      });
    });

    player.on('error', (error: Error) => {
      console.error(LoggerPrefix, 'Error in MPRIS');
      console.trace(error);
    });

    ipcMain.on('ytmd:volume-changed', (_, newVol) => {
      player.volume = Number.parseFloat((newVol / 100).toFixed(2));
    });

    player.on('volume', (newVolume: number) => {
      if (config.plugins.isEnabled('precise-volume')) {
        // With precise volume we can set the volume to the exact value.
        win.webContents.send('setVolume', ~~(newVolume * 100));
      } else {
        setVolume(newVolume * 100);
      }
    });

    registerCallback((songInfo: SongInfo, event) => {
      if (event === SongInfoEvent.TimeChanged) {
        player.setPosition(secToMicro(songInfo.elapsedSeconds ?? 0));
        return;
      }
      if (player) {
        const data: Track = {
          'mpris:length': secToMicro(songInfo.songDuration),
          ...(songInfo.imageSrc
            ? { 'mpris:artUrl': songInfo.imageSrc }
            : undefined),
          'xesam:title': songInfo.title,
          'xesam:url': songInfo.url,
          'xesam:artist': [songInfo.artist],
          'mpris:trackid': player.objectPath(
            `Track/${correctId(songInfo.videoId)}`,
          ),
        };
        if (songInfo.album) {
          data['xesam:album'] = songInfo.album;
        }
        currentSongInfo = songInfo;

        player.metadata = data;

        const currentElapsedMicroSeconds = secToMicro(
          songInfo.elapsedSeconds ?? 0,
        );
        player.setPosition(currentElapsedMicroSeconds);
        player.seeked(currentElapsedMicroSeconds);

        player.setPlaybackStatus(
          songInfo.isPaused ? PLAYBACK_STATUS_PAUSED : PLAYBACK_STATUS_PLAYING,
        );
      }
      requestQueueInformation();
    });
  } catch (error) {
    console.error(LoggerPrefix, 'Error in MPRIS');
    console.trace(error);
  }
}

export default registerMPRIS;
