const W: any = window;

const MAIN_CONFIG: { [key: string]: any } = W.MAIN_CONFIG;
if (!MAIN_CONFIG) { console.error('MAIN_CONFIG.js 不存在，请检查!'); }

export const API_ROOT: string = MAIN_CONFIG.API_ROOT;
