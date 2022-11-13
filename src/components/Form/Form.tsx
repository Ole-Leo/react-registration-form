import './Form.css';

import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { cn } from '@bem-react/classname';

type FormFields = {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
  checkbox: boolean;
};

const cnForm = cn('Form');

const validEmail = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i);
const validLoginLength = 4;
const validPasswordLength = 6;

export const Form: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<FormFields>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<FormFields> = data => {
    console.log(data);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={cnForm()}>
        <h1 className={cnForm('Heading')}>Registration Form</h1>
        <label className={cnForm('Label')}>
          Login:
          <input
            className={cnForm('Input', { text: true })}
            {...register('login', {
              required: 'Login is required',
              minLength: {
                value: validLoginLength,
                message: `Login should be at least ${validLoginLength} characters`,
              },
            })}
          />
        </label>
        {errors.login && (
          <p className={cnForm('Error')}>{errors.login.message}</p>
        )}
        <label className={cnForm('Label')}>
          Email:
          <input
            className={cnForm('Input', { text: true })}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: validEmail,
                message: 'Email should be valid',
              },
            })}
          />
        </label>
        {errors.email && (
          <p className={cnForm('Error')}>{errors.email.message}</p>
        )}
        <label className={cnForm('Label')}>
          Password:
          <input
            className={cnForm('Input', { text: true })}
            type="password"
            {...register('password', {
              required: 'Password is required!',
              minLength: {
                value: validPasswordLength,
                message: `Password should be at least ${validPasswordLength} characters`,
              },
            })}
          />
        </label>
        {errors.password && (
          <p className={cnForm('Error')}>{errors.password.message}</p>
        )}
        <label className={cnForm('Label')}>
          Confirm Password:
          <input
            className={cnForm('Input', { text: true })}
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm password!',
              validate: {
                matchesPreviousPassword: value => {
                  const { password } = getValues();
                  return password === value || `Passwords don't match!`;
                },
              },
            })}
          />
        </label>
        {errors.confirmPassword && (
          <p className={cnForm('Error')}>{errors.confirmPassword.message}</p>
        )}
        <label className={cnForm('Label')}>
          <input
            className={cnForm('Input', { checkbox: true })}
            type="checkbox"
            {...register('checkbox', {
              required: 'Please, check this field',
              value: true,
            })}
          />
          Agree with terms and conditions
        </label>
        {errors.checkbox && (
          <p className={cnForm('Error')}>{errors.checkbox.message}</p>
        )}
        <input
          className={cnForm('Input', { submit: true })}
          type="submit"
          disabled={!isValid}
        />
      </form>
    </>
  );
};
