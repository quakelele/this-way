import styles from './Header.module.scss'

export const Header = () => {
    return (
        <header className={styles.header}>
            <h1 >Таков Путь..</h1>
            <h3 >هكذا الطريق</h3>
            <p >
                Добро пожаловать в духовное путешествие.
                <br />
                Пусть этот путь приведёт к миру и просветлению.
            </p>
        </header>
    )
}
