import { isPC } from '@/tools/browser';

function setRem() {
  const baseSize = 16;

  if (isPC()) {
    document.documentElement.style.fontSize = baseSize + 'px';
    return;
  }

  const scale = document.documentElement.clientWidth / 375;
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px';
}

setRem();
window.addEventListener('resize', () => {
  setRem();
});