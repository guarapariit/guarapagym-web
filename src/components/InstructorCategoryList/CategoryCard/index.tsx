import { useEffect, useState } from 'react';
import { FiSave, FiTrash2 } from 'react-icons/fi';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

import CustomSelector from '../../CustomSelector';
import { Card } from '../../../styles/components/Instructor/CategoryCard';
import { Category, ExerciseI } from '../../../types';
import theme from '../../../styles/theme';
import api from '../../../services/api';

interface CategoryCardProps {
  category?: Category;
  add?: boolean;
  savedCallback?: any;
}

export default function CategoryCard({
  category,
  add,
  savedCallback,
}: CategoryCardProps) {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (category) {
      fillForm();
    }
  }, []);

  function fillForm() {
    const { name } = category;

    setName(name);
  }

  function isFilled() {
    if (name === '') return false;

    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log('submitou');

    const data = {
      name,
    };

    if (add) {
      console.log(data);

      if (isFilled()) {
        api
          .post('/categories', data)
          .then(response => {
            NotificationManager.success('', 'Salvo!', 3000);
            savedCallback();
          })
          .catch(error => {
            NotificationManager.error('', 'Erro', 3000);
            console.log(error.response.data);
          });
      } else {
        NotificationManager.error('', 'Preencha o Campo!', 3000);
      }
    } else {
      api
        .put(`/categories/${category.id}`, data)
        .then(response => {
          NotificationManager.success('', 'Salvo!', 3000);
          savedCallback();
        })
        .catch(error => {
          NotificationManager.error('', 'Erro', 3000);
          console.log(error.response.data);
        });
    }
  }

  function handleDelete() {
    console.log(`/categories/${category.id}`);

    api
      .delete(`/categories/${category.id}`)
      .then(response => {
        NotificationManager.success('', 'Salvo!', 3000);
        savedCallback();
      })
      .catch(error => {
        NotificationManager.error('', 'Erro', 3000);
        console.log(error?.response.data);
      });
  }

  return (
    <Card>
      <form onSubmit={e => handleSubmit(e)}>
        <fieldset className="inputs">
          <div className="input-wrapper name">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </div>
        </fieldset>
        <fieldset className="buttons">
          <button type="submit">
            <FiSave color={theme.colors.white} size={24} />
          </button>
          {!add ? (
            <button onClick={handleDelete}>
              <FiTrash2 color={theme.colors.white} size={24} />
            </button>
          ) : (
            ''
          )}
        </fieldset>
      </form>
    </Card>
  );
}
