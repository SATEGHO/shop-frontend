import { FC, useEffect, useState } from 'react';
import styles from './AuthForm.module.scss';
import Input from '@/components/ui/input/Input';
import Label from '@/components/ui/label/Label';
import Button from '@/components/ui/button/Button';
import { ButtonSize, ButtonVariant } from '@/types/button.types';
import { useLoginUser, useRegisterUser } from '@/services/react-query/user.queries';
import Error from '@/components/ui/error/Error';

interface Props {
  formType: string;
  setFormType: (type: string) => void;
  onCloseModal: () => void;
}

const AuthForm: FC<Props> = ({ formType, setFormType, onCloseModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const cb = () => {
    onCloseModal();
    setEmail('');
    setPassword('');
    setName('');
  };

  useEffect(() => {
    setEmail('');
    setPassword('');
    setName('');
  }, [formType]);

  const {
    refetch: fetchLogin,
    isFetching: loadingLogin,
    error: errorLogin,
  } = useLoginUser({ email, password }, cb);
  const {
    refetch: fetchRegister,
    isFetching: loadingRegister,
    error: errorRegister,
  } = useRegisterUser({ fullName: name, email, password }, cb);

  const onLogin = () => {
    fetchLogin();
  };

  const onRegister = () => {
    fetchRegister();
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      {formType === 'login' ? (
        <>
          <div className={styles.group}>
            <Label>Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите email"
            />
          </div>
          <div className={styles.group}>
            <Label>Пароль</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
          </div>
          <div className={styles.text}>
            Нет аккаунта? -{' '}
            <span className={styles.link} onClick={() => setFormType('register')}>
              Зарегистрироваться
            </span>
          </div>
          {errorLogin && (
            <Error style={{ marginBottom: 20 }}>
              {errorLogin.response?.data?.message ?? errorLogin.message}
            </Error>
          )}
          <Button
            variant={ButtonVariant.primary}
            size={ButtonSize.lg}
            onClick={onLogin}
            disabled={loadingLogin}>
            Войти
          </Button>
        </>
      ) : (
        <>
          <div className={styles.group}>
            <Label>Имя</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите ваше имя"
            />
          </div>
          <div className={styles.group}>
            <Label>Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите email"
            />
          </div>
          <div className={styles.group}>
            <Label>Пароль</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
          </div>
          <div className={styles.text}>
            Уже есть аккаунт? -{' '}
            <span className={styles.link} onClick={() => setFormType('login')}>
              Войти
            </span>
          </div>
          {errorRegister && (
            <Error style={{ marginBottom: 20 }}>
              {errorRegister.response?.data?.message ?? errorRegister.message}
            </Error>
          )}
          <Button
            variant={ButtonVariant.primary}
            size={ButtonSize.lg}
            onClick={onRegister}
            disabled={loadingRegister}>
            Зарегистрироваться
          </Button>
        </>
      )}
    </form>
  );
};

export default AuthForm;
