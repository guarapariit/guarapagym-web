import { Category, ExerciseI } from '../../types';
import { FiPlusCircle } from 'react-icons/fi';

import ExerciseCard from './CategoryCard';
import { List } from '../../styles/components/Instructor/InstructorCategoriesList';
import { useEffect, useState } from 'react';
import api from '../../services/api';

interface InstructorCategoriesListProps {
  categories: Category[];
}

function InstructorCategoriesList({
  categories,
}: InstructorCategoriesListProps) {
  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  const [categoryList, setCategoryList] = useState(categories);

  function toggleNewCategoryOpen() {
    setNewCategoryOpen(oldValue => !oldValue);
  }

  function handleSaved() {
    api.get('/categories').then(response => {
      const { data } = response;

      setNewCategoryOpen(false);
      setCategoryList(data);
    });
  }

  return (
    <List>
      <h3>Categorias</h3>
      <ul>
        {categoryList.map(category => {
          return (
            <ExerciseCard
              key={category.id}
              category={category}
              savedCallback={handleSaved}
            />
          );
        })}
        {newCategoryOpen ? (
          <ExerciseCard savedCallback={handleSaved} add />
        ) : (
          ''
        )}
      </ul>
      <button className="add-exercise" onClick={toggleNewCategoryOpen}>
        Adicionar <FiPlusCircle size={18} />
      </button>
    </List>
  );
}

export default InstructorCategoriesList;
