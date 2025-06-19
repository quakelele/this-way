import { Button, Card, Divider, Space, Tag, Typography } from 'antd'
import styles from './AyahBookmarkItem.module.scss'
import { BookOpen, Copy, Edit3, Trash2 } from 'lucide-react'
const { Title, Paragraph } = Typography
export const AyahBookmarkItem = () => {
  return (
    <Card className={styles.bookmarkCard}>
    <div className={styles.bookmarkHeader}>
      <div className={styles.bookmarkInfo}>
        <Space>
          <span className={styles.typeIconVerse}><BookOpen size={16} /></span>
          <Title level={5}>Пример аята</Title>
        </Space>
        <p>1 янв 2025, 12:00</p>
      </div>
      <Space className={styles.bookmarkActions}>
        <Button icon={<Edit3 size={16} />} />
        <Button icon={<Copy size={16} />} />
        <Button icon={<Trash2 size={16} />} danger />
      </Space>
    </div>
    <Divider />
    <div className={styles.bookmarkContent}>
      <Paragraph className={styles.arabicText} style={{ textAlign: 'right', direction: 'rtl' }}>
        النص العربي للآية
      </Paragraph>
      <Paragraph className={styles.translationText}>Перевод аята</Paragraph>
    </div>
    <div className={styles.bookmarkTags}>
      <Tag color="blue">Тег 1</Tag>
      <Tag color="blue">Тег 2</Tag>
    </div>
    <Paragraph className={styles.noteText}>
      <strong>Заметки:</strong> Пример заметки
    </Paragraph>
  </Card>
  )
}
