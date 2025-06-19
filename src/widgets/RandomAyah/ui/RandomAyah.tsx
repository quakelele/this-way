import { Card } from 'antd'
import styles from './RandomAyah.module.scss'

export const RandomAyah = () => {
    return (
        <Card className={styles.quoteCard}>
            <div className={styles.quoteContent}>
                <p className={styles.quoteText}>
                    "И тот, кто уповает на Аллаха — Он достаточен для него"
                </p>
                <p className={styles.quoteRef}>Коран 65:3</p>
            </div>
        </Card>
    )
}
