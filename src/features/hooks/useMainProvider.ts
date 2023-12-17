import { useContext } from 'react';
import { MainContext } from '../providers';

export default function useMainProvider() {
  const context = useContext(MainContext);
  if (!context)
    throw new Error(
      'The useMain function ought to be encapsulated within the scope of the MainProvider component.'
    );
  return context;
}
