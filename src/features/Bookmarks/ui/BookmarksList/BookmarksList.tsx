// import { Button, Card, Divider, Input, Space, Tag, Typography } from 'antd'
// import { BookOpen, Copy, Edit3, FileText, Music, Play, Plus, Trash2 } from 'lucide-react'
import { AyahBookmarkItem } from 'entities/AyahBookmark/ui/AyahBookmarkItem/AyahBookmarkItem'
import styles from './BookmarkList.module.scss'


// const { Title, Paragraph } = Typography


export const BookmarksList = () => {
  return (
    <div className={styles.bookmarksList}>
     

          <AyahBookmarkItem/>

{/* // Аудио */}
          {/* <Card className={styles.bookmarkCard}>
            <div className={styles.bookmarkHeader}>
              <div className={styles.bookmarkInfo}>
                <Space>
                  <span className={styles.typeIconAudio}><Music size={16} /></span>
                  <Title level={5}>Пример аудио</Title>
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
              <Space className={styles.audioControls}>
                <Button shape="circle" icon={<Play size={12} />} />
                <p>Описание аудио</p>
              </Space>
            </div>
            <div className={styles.bookmarkTags}>
              <Tag color="blue">Тег 1</Tag>
            </div>
          </Card> */}
{/* // Заметки */}
          {/* <Card className={styles.bookmarkCard}>
            <div className={styles.bookmarkHeader}>
              <div className={styles.bookmarkInfo}>
                <Space>
                  <span className={styles.typeIconNote}><FileText size={16} /></span>
                  <Title level={5}>Пример заметки</Title>
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
              <Paragraph className={styles.noteText}>Содержание заметки</Paragraph>
            </div>
            <div className={styles.noteEditor}>
              <Input.TextArea
                placeholder="Добавьте свои заметки..."
                autoSize={{ minRows: 3 }}
              />
              <Space className={styles.editorActions}>
                <Button type="primary">Сохранить</Button>
                <Button>Отмена</Button>
              </Space>
            </div>
          </Card> */}

{/* // Перейти начтение  */}
          {/* <Card className={styles.emptyState}>
            <Space direction="vertical" align="center" size="middle">
              <div className={styles.emptyIcon}>
                <BookOpen size={32} />
              </div>
              <Title level={4}>У вас пока нет закладок</Title>
              <Paragraph>Начните читать Коран и сохраняйте понравившиеся аяты</Paragraph>
              <Button type="primary" icon={<Plus size={16} />}>
                Начать чтение
              </Button>
            </Space>
          </Card> */}

        </div>
  )
}
