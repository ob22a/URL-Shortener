import React, { useState, useEffect, useRef } from 'react';
import { addDays,format } from 'date-fns';
import {type ExpirationOption, getDateFromOption, formatDate, formatDetailedDate, getMinDate, getMaxDate} from '../utils/dateHandler';
import '../styles/ExpirationDatePicker.css';

interface ExpirationDatePickerProps {
  selectedDate?: Date | null;
  onDateChange: (date: Date | null) => void;
  defaultOption?: ExpirationOption;
}

const ExpirationDatePicker: React.FC<ExpirationDatePickerProps> = ({
  selectedDate,
  onDateChange,
  defaultOption = 'never'
}) => {

  const [showMenu, setShowMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ExpirationOption>(defaultOption);
  const [customDate, setCustomDate] = useState<string>('');
  const [customTime, setCustomTime] = useState<string>('23:59');
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle option selection
  const handleOptionSelect = (option: ExpirationOption) => {
    setSelectedOption(option);
    const date = getDateFromOption(option, customDate, customTime);
    onDateChange(date);
    
    // Close menu if not custom
    if (option !== 'custom') {
      setShowMenu(false);
    }
  };

  // Handle custom date/time change
  const handleCustomDateTimeChange = () => {
    if (customDate && customTime) {
      handleOptionSelect('custom');
    }
  };

  // Get icon for option
  const getOptionIcon = (option: ExpirationOption): string => {
    switch (option) {
      case '1h': return 'fa-clock';
      case '24h': return 'fa-calendar-day';
      case '7d': return 'fa-calendar-week';
      case '30d': return 'fa-calendar-alt';
      case 'never': return 'fa-infinity';
      case 'custom': return 'fa-calendar-plus';
      default: return 'fa-clock';
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="expiration-date-picker" ref={menuRef}>
      <button
        type="button"
        className="expiration-toggle"
        onClick={() => setShowMenu(!showMenu)}
        title="Set expiration date"
      >
        <i className={`fas ${getOptionIcon(selectedOption)}`}></i>
        <span className="expiration-text">
          {selectedDate ? `Expires ${formatDate(selectedDate)}` : 'Never expires'}
        </span>
        <i className={`fas fa-chevron-${showMenu ? 'up' : 'down'}`}></i>
      </button>
      
      {showMenu && (
        <div className="expiration-menu">
          <div className="expiration-header">
            <i className="fas fa-hourglass-half"></i>
            <span>Set Expiration Date</span>
          </div>
          
          <div className="expiration-options">
            {(['1h', '24h', '7d', '30d', 'never'] as ExpirationOption[]).map((option) => (
              <button
                key={option}
                type="button"
                className={`expiration-option ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                <i className={`fas ${getOptionIcon(option)}`}></i>
                <span>
                  {option === '1h' ? '1 hour' :
                   option === '24h' ? '24 hours' :
                   option === '7d' ? '7 days' :
                   option === '30d' ? '30 days' :
                   'Never expires'}
                </span>
                {selectedOption === option && (
                  <i className="fas fa-check"></i>
                )}
              </button>
            ))}
            
            {/* Custom Date/Time Picker */}
            <div className="custom-date-section">
              <button
                type="button"
                className={`expiration-option ${selectedOption === 'custom' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('custom')}
              >
                <i className="fas fa-calendar-plus"></i>
                <span>Custom date</span>
                {selectedOption === 'custom' && (
                  <i className="fas fa-check"></i>
                )}
              </button>
              
              {selectedOption === 'custom' && (
                <div className="custom-date-inputs">
                  <div className="date-input-group">
                    <label htmlFor="expiration-date">
                      <i className="fas fa-calendar"></i>
                      Date
                    </label>
                    <input
                      type="date"
                      id="expiration-date"
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      onBlur={handleCustomDateTimeChange}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="date-input styled-date-input"
                    />
                  </div>
                  
                  <div className="time-input-group">
                    <label htmlFor="expiration-time">
                      <i className="fas fa-clock"></i>
                      Time
                    </label>
                    <input
                      type="time"
                      id="expiration-time"
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      onBlur={handleCustomDateTimeChange}
                      className="time-input styled-time-input"
                    />
                  </div>
                  
                  <div className="selected-date-preview">
                    <i className="fas fa-calendar-check"></i>
                    <span>
                      {customDate && customTime 
                        ? `Will expire on ${new Date(`${customDate}T${customTime}`).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}`
                        : 'Select a date and time'
                      }
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Selected date summary */}
          <div className="date-summary">
            <i className="fas fa-info-circle"></i>
            <span>
              {selectedDate 
                ? `Link will expire on ${formatDetailedDate(selectedDate)}`
                : 'Link will never expire'
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpirationDatePicker;