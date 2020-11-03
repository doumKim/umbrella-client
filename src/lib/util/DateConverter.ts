export const TimestampToWeek = (time: number): string => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(time * 1000);
  const today = new Date(date).getDay();
  return week[today];
};

export const MdotDConverter = (date: string): string => {
  const [, month, day] = date.split('-');
  return `${month}.${day}`;
};

export const TimestampToDate = (time: number): string => {
  const date = new Date(time * 1000);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}.${day}`;
};

export const DateToTimestamp = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day =
    date.getDate() < 10
      ? `0${date.getDate()}`
      : `${date.getDate()}`;
  return new Date(`${year}-${month}-${day}`).getTime();
};