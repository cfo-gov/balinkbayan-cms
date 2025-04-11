import dayjs from 'dayjs';

export const formatDate = (
  date: Date | string | number,
  desireFormat: string | undefined = 'DD/MM/YYYY'
) => {
  return date ? dayjs(date).format(desireFormat) : '';
};
