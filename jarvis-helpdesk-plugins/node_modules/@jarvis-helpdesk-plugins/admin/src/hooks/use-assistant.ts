import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppStore } from '@/src/store';

export const useAssistant = () => {
  const assistant = useAppStore((state) => state.assistant);
  const navigate = useNavigate();

  useEffect(() => {
    if (!assistant) {
      navigate('/interrupts');
    }
  }, [assistant, navigate]);

  return assistant;
};
