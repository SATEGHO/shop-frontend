import styles from './Search.module.scss';
import Button from '../ui/button/Button';
import { ButtonSize, ButtonVariant } from '@/types/button.types';

const Search = () => {
  return (
    <div className={styles.search}>
      <div className={styles.body}>
        <div className={styles.container}>
          <i className={`${styles.icon} fa-light fa-magnifying-glass`}></i>
          <input type="text" className={styles.input} placeholder="Поиск по каталогу" />
          <Button
            size={ButtonSize.lg}
            variant={ButtonVariant.primary}
            style={{ position: 'absolute', right: 0 }}>
            Найти
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Search;
