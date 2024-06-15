import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

const DateCalendarServerRequest = ({ data, _currentDate, _setCurrentDate }: any) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [currentDate, setCurrentDate] = React.useState<any>(dayjs())

  React.useEffect(() => {
    const temp_days: any = Object.keys(data).map(key => Number(key)) ?? []
    setHighlightedDays(temp_days)
  }, [data])
  React.useEffect(() => {
    if (_currentDate) {
      setCurrentDate(dayjs(_currentDate))
    }
  }, [currentDate])


  const ServerDay = (props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) => {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
    const date_string: any = dayjs(day).date()

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? data[date_string] : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  }

  const handleMonthChange = (date: Dayjs) => {
    _setCurrentDate(date.toDate())
    setHighlightedDays([])
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={currentDate}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          } as any,
        }}
      />
    </LocalizationProvider>
  );
}

export default DateCalendarServerRequest;
