import { addYears ,addHours, formatDistanceToNow, addDays, parse, format } from 'date-fns';

export type ExpirationOption = '1h' | '24h' | '7d' | '30d' | 'never' | 'custom';

export const getDateFromOption = (option: ExpirationOption, customDate:string, customTime:string): Date | null => {
  const now = new Date();
  
  switch (option) {
    case '1h':
      return addHours(now, 1);
    case '24h':
      return addHours(now, 24);
    case '7d':
      return addDays(now, 7);
    case '30d':
      return addDays(now, 30);
    case 'never':
      return null;
    case 'custom':
      if (customDate && customTime) {
        return parse(`${customDate} ${customTime}`, 'yyyy-MM-dd HH:mm', new Date());
      }
      return null;
    default:
      return null;
  }
};

export const formatDate = (date: Date | null): string => {
    if (!date) return 'Never expires';
    
    return formatDistanceToNow(date, { addSuffix: true });
};

export const formatDetailedDate = (date: Date | null): string => {
    if (!date) return 'Never expires';
    return format(date, 'MMM d, yyyy, hh:mm a');
};

 // Set min date for date input (today)
export const getMinDate = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

// Set max date for date input (1 year from now)
export const getMaxDate = (): string => {
  const nextYear = addYears(new Date(), 1);
  return format(nextYear, 'yyyy-MM-dd');
};