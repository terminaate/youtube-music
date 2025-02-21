import { io } from 'socket.io-client';

import { UpdateWebsiteStateConfig } from '@/plugins/update-website-state/index';

import { createBackend } from '@/utils';
import { BackendContext } from '@/types/contexts';
import registerCallback, {
  SongInfo,
  SongInfoEvent,
} from '@/providers/song-info';

export const backend = createBackend<
  {
    config?: UpdateWebsiteStateConfig;
    socket?: ReturnType<typeof io>;
    lastSongInfo?: SongInfo;
    sendData(songInfo: SongInfo): void;
    disconnectFromSocket(): void;
    connectToSocket(): void;
    setupListeners(ctx: BackendContext<UpdateWebsiteStateConfig>): void;
  },
  UpdateWebsiteStateConfig
>({
  async start(ctx) {
    this.config = await ctx.getConfig();

    this.setupListeners(ctx);

    this.connectToSocket();
  },

  sendData(songInfo: SongInfo) {
    if (songInfo.title.length === 0 && songInfo.artist.length === 0) {
      return;
    }

    this.lastSongInfo = songInfo;

    if (!this.socket?.connected) {
      return;
    }

    const hangulFillerUnicodeCharacter = '\u3164'; // This is an empty character
    const paddedInfoKeys: (keyof SongInfo)[] = ['title', 'artist', 'album'];
    for (const key of paddedInfoKeys) {
      const keyLength = (songInfo[key] as string)?.length;
      if (keyLength < 2) {
        (songInfo[key] as string) += hangulFillerUnicodeCharacter.repeat(
          2 - keyLength,
        );
      }
    }

    this.socket.emit('ytm:update-current-state', {
      song: songInfo,
      isPlaying: songInfo ? !songInfo.isPaused : false,
      position: songInfo?.elapsedSeconds ?? 0,
    });
  },

  setupListeners(ctx: BackendContext<UpdateWebsiteStateConfig>) {
    ctx.window.once('ready-to-show', () => {
      let lastSent = Date.now();

      registerCallback((songInfo, event) => {
        if (event !== SongInfoEvent.TimeChanged) {
          this.lastSongInfo = songInfo;
          this.sendData(songInfo);
        } else {
          const currentTime = Date.now();
          // if lastSent is more than 5 seconds ago, send the new time
          if (currentTime - lastSent > 10_000) {
            lastSent = currentTime;
            if (songInfo) {
              this.lastSongInfo = songInfo;
              this.sendData(songInfo);
            }
          }
        }
      });
    });
  },

  connectToSocket() {
    if (!this.config?.secretKey) {
      console.log('Secret key is required');
      return;
    }

    if (!this.config?.socketIOUrl) {
      console.log('Secret key is required');

      return;
    }

    this.socket = io(this.config.socketIOUrl, {
      auth: {
        secretKey: this.config.secretKey,
      },
    });

    this.socket.on('connect', () => {
      console.log('Connected to socket.io');

      const songInfo = this.lastSongInfo;
      if (!songInfo) {
        return;
      }

      this.socket!.emit('ytm:update-current-state', {
        song: songInfo,
        isPlaying: songInfo ? !songInfo.isPaused : false,
        position: songInfo?.elapsedSeconds ?? 0,
      });
    });
  },

  stop() {
    this.disconnectFromSocket();
  },

  disconnectFromSocket() {
    this.socket?.disconnect();
    this.socket = undefined;
  },

  onConfigChange(newConfig) {
    this.config = newConfig;
    this.disconnectFromSocket();
    this.connectToSocket();
  },
});
