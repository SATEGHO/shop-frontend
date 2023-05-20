export const formatDate = (date: string | number, options?: { date: string }) => {
  const optionsDate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  if (options?.date !== 'short') {
    optionsDate.hour = 'numeric';
    optionsDate.minute = 'numeric';
    optionsDate.second = 'numeric';
  }
  return new Intl.DateTimeFormat('ru-RU', optionsDate).format(new Date(date));
};
