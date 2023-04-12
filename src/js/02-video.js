import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const KEY_VALUE = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem(KEY_VALUE, data.seconds);
  }, 1000)
);

if (localStorage.getItem(KEY_VALUE)) {
  const sec = localStorage.getItem(KEY_VALUE);
  player.setCurrentTime(sec);
}
