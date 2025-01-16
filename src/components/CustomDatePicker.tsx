import React, { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { Calendar } from 'lucide-react';
import 'react-day-picker/dist/style.css';

interface CustomDatePickerProps {
  date: string;
  onDateChange: (value: string) => void;
  error?: boolean;
}

const MONTHS = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

function CustomDatePicker({ date, onDateChange, error }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDaySelect = (day: Date | undefined) => {
    if (day) {
      onDateChange(day.toISOString().split('T')[0]);
      setIsOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextYear = new Date();
  nextYear.setFullYear(today.getFullYear() + 1);

  return (
    <div className="relative" ref={calendarRef}>
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          readOnly
          value={formatDate(date)}
          onClick={() => setIsOpen(!isOpen)}
          placeholder="Sélectionner une date"
          className={`w-full pl-10 pr-4 py-3 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-lg text-gray-700 placeholder-gray-400 bg-white cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 ${
            error ? 'focus:ring-red-200' : 'focus:ring-red-100'
          } focus:border-red-500 transition-colors`}
        />
      </div>
      {isOpen && (
        <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-[60]" style={{ width: '240px' }}>
          <DayPicker
            mode="single"
            selected={date ? new Date(date) : undefined}
            onSelect={handleDaySelect}
            fromDate={today}
            toDate={nextYear}
            locale={fr}
            weekStartsOn={1}
            modifiers={{
              today: today,
            }}
            modifiersStyles={{
              today: {
                fontWeight: 'bold',
                color: '#ef4444'
              }
            }}
            styles={{
              root: { 
                width: '100%',
                fontSize: '0.7rem',
                '--rdp-cell-size': '28px',
                margin: 0,
                padding: '0.25rem'
              },
              caption: { 
                color: '#374151',
                padding: '0.25rem',
                textTransform: 'capitalize',
                fontSize: '0.8rem'
              },
              head_cell: { 
                color: '#6b7280',
                padding: '0.25rem',
                fontWeight: '600',
                fontSize: '0.7rem'
              },
              day_selected: { 
                backgroundColor: '#ef4444 !important',
                color: 'white !important'
              },
              day: { 
                margin: '1px',
                height: '28px',
                width: '28px',
                fontSize: '0.7rem',
                borderRadius: '4px',
                transition: 'background-color 0.2s ease',
                cursor: 'pointer'
              },
              day_today: {
                color: '#ef4444',
                backgroundColor: '#fee2e2'
              },
              day_outside: {
                color: '#9ca3af'
              },
              table: {
                width: '100%',
                borderSpacing: '1px',
                borderCollapse: 'separate'
              },
              nav_button_previous: {
                color: '#374151',
                padding: '0.25rem',
                margin: '0 0.25rem',
                width: '24px',
                height: '24px'
              },
              nav_button_next: {
                color: '#374151',
                padding: '0.25rem',
                margin: '0 0.25rem',
                width: '24px',
                height: '24px'
              }
            }}
            formatters={{
              formatCaption: (date: Date) => {
                return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
              },
              formatWeekdayName: (weekday: Date) => {
                const day = weekday.getDay();
                return WEEKDAYS[day === 0 ? 6 : day - 1];
              }
            }}
            labels={{
              today: "Aujourd'hui"
            }}
          />
        </div>
      )}
    </div>
  );
}

// French locale configuration
const fr = {
  locale: 'fr-FR',
  formatLong: {
    date: (date: Date) => date.toLocaleDateString('fr-FR'),
  },
  formatRelative: (token: string) => token,
  localize: {
    month: (n: number) => MONTHS[n],
    day: (n: number) => WEEKDAYS[n === 0 ? 6 : n - 1],
  },
  match: {
    weekdays: /^(di|lu|ma|me|je|ve|sa)/i,
  },
  options: {
    weekStartsOn: 1,
  },
};

export default CustomDatePicker;