import { useTranslation } from 'shared/hooks/useTranslation'
import styles from './Header.module.scss'

export const Header = () => {
    const { t } = useTranslation()
    return (
        <header className={styles.header}>
            <h1 >{t('Таков Путь..')}</h1>
            <h3 >هكذا الطريق</h3>
            <p >
                {t('Добро пожаловать в духовное путешествие.')}
                <br />
                {t('Пусть этот путь приведёт к миру и просветлению.')}
            </p>
        </header>
    )
}
