export const WeekConverter = (date: string): string => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const today = new Date(date).getDay();
  return week[today];
};

export const MdotDConverter = (date: string): string => {
  const [, month, day] = date.split('-');
  return `${month}.${day}`;
};