import React, { useState } from 'react';
import { FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { DatedTraining, Training } from '../../types';

import {
  Container,
  Date,
  Type,
  Category,
  SequencyList,
  SequencyListItem,
} from './styles';

interface TrainingListItemProps {
  training: DatedTraining;
}

const TrainingListItem: React.FC<TrainingListItemProps> = ({ training }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
      <div>
        {!isOpen ? (
          <>
            <Date>{training.parsedDate}</Date>
            <Type>Treino</Type>
            <Category>{training.category}</Category>
          </>
        ) : (
          <>
            <Date>{training.parsedDate}</Date>
            <SequencyList>
              <div>
                <Type>Treino</Type>
                <Category>{training.category}</Category>
              </div>
              {training.trainings_sequencies.map(({ sequency }, index) => (
                <SequencyListItem>
                  <div>
                    <span className="index">{index + 1}</span>
                    <span className="sets">{sequency.sets} set(s) de</span>
                    <span className="repetitions">{sequency.repetitions}</span>
                    <strong className="exercise">
                      {sequency.exercise.name}
                    </strong>
                  </div>
                  <a href={sequency.exercise.video_url} target="_blank">
                    Como fazer? <FiArrowRight size={30} />
                  </a>
                </SequencyListItem>
              ))}
            </SequencyList>
          </>
        )}
      </div>
      <FiChevronDown size={36} transform={!isOpen ? `rotate(180)` : ''} />
    </Container>
  );
};

export default TrainingListItem;
