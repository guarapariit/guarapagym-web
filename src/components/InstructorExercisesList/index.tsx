import { Category, ExerciseI } from '../../types';
import { FiPlusCircle } from 'react-icons/fi';

import ExerciseCard from './ExerciseCard';
import { List } from '../../styles/components/Instructor/InstructorExercisesList';
import { useEffect, useState } from 'react';
import api from '../../services/api';

interface InstructorExercisesListProps {
  exercises: ExerciseI[];
  categories: Category[];
}

function InstructorExercisesList({
  exercises,
  categories,
}: InstructorExercisesListProps) {
  const [newExerciseOpen, setNewExerciseOpen] = useState(false);
  const [exercisesList, setExercisesList] = useState(exercises);

  function toggleNewExerciseOpen() {
    setNewExerciseOpen(oldValue => !oldValue);
  }

  function handleSaved() {
    api.get('/exercises').then(response => {
      const { data } = response;

      setNewExerciseOpen(false);
      setExercisesList(data);
    });
  }

  return (
    <List>
      <h3>Exercicios</h3>
      <ul>
        {exercisesList.map(exercise => {
          return (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              categories={categories}
              savedCallback={handleSaved}
            />
          );
        })}
        {newExerciseOpen ? (
          <ExerciseCard
            categories={categories}
            savedCallback={handleSaved}
            add
          />
        ) : (
          ''
        )}
      </ul>
      <button className="add-exercise" onClick={toggleNewExerciseOpen}>
        Adicionar <FiPlusCircle size={18} />
      </button>
    </List>
  );
}

export default InstructorExercisesList;
