import './App.css';

import { FC } from 'react';
import { Form } from './components/Form/Form';
import { cn } from '@bem-react/classname';

const cnApp = cn('App');

const App: FC = () => {
  return (
    <div className={cnApp()}>
      <Form />
    </div>
  );
};

export default App;
