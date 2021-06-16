import { useEffect, useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

import { Selector } from '../../styles/components/CustomSelector';
import theme from '../../styles/theme';

interface CustomSelectorProps {
  selected: any;
  toSelect: any;
  showKey: string;
  callback: (selected: any) => any;
}

export default function CustomSelector({
  selected,
  toSelect,
  showKey,
  callback,
}: CustomSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(selected);

  useEffect(() => {
    callback(selected);
  }, []);

  function toggleSelector() {
    setIsOpen(oldValue => !oldValue);
  }

  return (
    <Selector className={`selector ${isOpen ? 'open' : ''}`}>
      <div className="selected" onClick={toggleSelector}>
        <span>{current[showKey]}</span>
        {isOpen ? (
          <FiChevronUp size={20} color={theme.colors.brown} />
        ) : (
          <FiChevronDown size={20} color={theme.colors.brown} />
        )}
      </div>
      <ul className="to-select">
        {toSelect.map(option => {
          option['name'];
          return (
            <li
              key={option[showKey]}
              onClick={() => {
                setCurrent(option);
                toggleSelector();
                callback(option);
              }}
            >
              {option[showKey]}
            </li>
          );
        })}
      </ul>
    </Selector>
  );
}
