export function addHours(date: Date, hours: number): Date {
  date.setHours(date.getHours() + hours);
  return date;
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'numeric',
    day: 'numeric',
    weekday: 'short'
  };

  const dateString = date.toLocaleDateString('ko-KR', options).replace(/\./g, '').trim();

  const parts = dateString.split(' ');
  const month = parts[0];
  const day = parts[1];
  const weekday = parts[2];

  return `${month}/${day} ${weekday}`;
}

export const timeForToday = (value: string) => {
  const today = new Date();
  const timeValue = new Date(value);

  timeValue.setHours(timeValue.getHours() + 9);

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 2) {
    return `${betweenTimeDay}일전`;
  }

  return formatDate(timeValue);
};
