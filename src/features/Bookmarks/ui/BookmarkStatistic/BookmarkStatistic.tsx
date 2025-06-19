import { Card, Col, Row, Statistic } from 'antd'
import styles from './BookmarkStatistic.module.scss'
import { BookOpen, FileText, Music } from 'lucide-react'


export const BookmarkStatistic = () => {
  return (
    <Row gutter={[16, 16]} className={styles.stats}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Аятов"
                value={0}
                prefix={<BookOpen size={24} />}
                valueStyle={{ color: '#4f46e5' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>

            <Card>
              <Statistic
                title="Аудио"
                value={0}
                prefix={<Music size={24} />}
                valueStyle={{ color: '#10b981' }}
              />
            </Card>
            
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Заметок"
                value={0}
                prefix={<FileText size={24} />}
                valueStyle={{ color: '#f59e0b' }}
              />
            </Card>
          </Col>
        </Row>
  )
}
