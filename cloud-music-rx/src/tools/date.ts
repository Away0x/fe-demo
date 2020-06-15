/** yyyymmdd(new Date) -> "2018-07-23" */
export function yyyymmdd(date_obj: Date, delimiter = '-') {
  const yyyy = date_obj.getFullYear().toString();
  const mm = (date_obj.getMonth() + 1).toString();
  const dd = date_obj.getDate().toString();

  return yyyy + delimiter + (mm[1] ? mm : `0${mm[0]}`)
    + delimiter + (dd[1] ? dd : `0${dd[0]}`);
}

/** yymmddhhmm(new Date) 2018-07-23 14:55 */
export function yymmddhhmm(date_obj: Date, delimiter = '-') {
  const yy = date_obj.getFullYear().toString();
  const mm = (date_obj.getMonth() + 1).toString();
  const dd = date_obj.getDate().toString();
  const hh = date_obj.getHours().toString();
  const MM = date_obj.getMinutes().toString();

  return yy + delimiter + (mm[1] ? mm : `0${mm[0]}`)
    + delimiter + (dd[1] ? dd : `0${dd[0]}`) + ' '
    + (hh[1] ? hh : `0${hh[0]}`) + ':' + (MM[1] ? MM : `0${MM[0]}`);
}

/** yymmddhhmmss(new Date) 2018-07-23 14:55:55 */
export function yymmddhhmmss(date_obj: Date, delimiter = '-') {
  const yy = date_obj.getFullYear().toString();
  const mm = (date_obj.getMonth() + 1).toString();
  const dd = date_obj.getDate().toString();
  const hh = date_obj.getHours().toString();
  const MM = date_obj.getMinutes().toString();
  const ss = date_obj.getSeconds().toString();

  return yy + delimiter + (mm[1] ? mm : `0${mm[0]}`)
    + delimiter + (dd[1] ? dd : `0${dd[0]}`) + ' '
    + (hh[1] ? hh : `0${hh[0]}`) + ':' + (MM[1] ? MM : `0${MM[0]}`) + ':' + (ss[1] ? ss : `0${ss[0]}`);
}


//转换歌曲播放时间
export const formatPlayTime = (interval: number) => {
  interval = interval | 0;
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
};