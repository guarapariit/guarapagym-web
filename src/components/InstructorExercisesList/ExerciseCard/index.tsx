import { useEffect, useState } from 'react';
import { FiSave, FiTrash2 } from 'react-icons/fi';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

import CustomSelector from '../../CustomSelector';
import { Card } from '../../../styles/components/Instructor/ExerciseCard';
import { Category, ExerciseI } from '../../../types';
import theme from '../../../styles/theme';
import api from '../../../services/api';

interface ExerciseCardProps {
  exercise?: ExerciseI;
  categories: Category[];
  add?: boolean;
  savedCallback?: any;
}

export default function ExerciseCard({
  exercise,
  categories,
  add,
  savedCallback,
}: ExerciseCardProps) {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (exercise) {
      fillForm();
    }
  }, []);

  useEffect(() => {
    console.log(videoUrl);
  }, [videoUrl]);

  function fillForm() {
    const { name, category, video_url } = exercise;

    setName(name);
    setCategory(category.id);
    setVideoUrl(video_url);
  }

  function isFilled() {
    console.log('name', name);
    console.log('category', category);
    console.log('video', videoUrl);

    if (name === '') return false;
    if (category === '') return false;
    if (videoUrl === '') return false;

    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log('clickar');

    const data = {
      name,
      category_id: category,
      video_url: videoUrl,
    };

    if (add) {
      console.log(data);

      if (isFilled()) {
        api
          .post('/exercises', data)
          .then(response => {
            NotificationManager.success('', 'Salvo!', 3000);
            savedCallback();
          })
          .catch(error => {
            NotificationManager.error('', 'Erro', 3000);
            console.log(error.response.data);
          });
      } else {
        NotificationManager.error('', 'Preencha todos os Campos!', 3000);
      }
    } else {
    }
  }

  function handleDelete() {
    console.log(`/exercises/${exercise.id}`);

    api
      .delete(`/exercises/${exercise.id}`)
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
          <fieldset>
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

            <div className="input-wrapper category">
              <label htmlFor="name">Categoria</label>
              <CustomSelector
                selected={exercise?.category || categories[0]}
                toSelect={categories}
                showKey={'name'}
                callback={value => setCategory(value.id)}
              />
            </div>
          </fieldset>

          <div className="input-wrapper video">
            <label htmlFor="name">Link do vídeo</label>
            <input
              type="text"
              name="video"
              value={videoUrl}
              onChange={e => {
                setVideoUrl(e.target.value);
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
