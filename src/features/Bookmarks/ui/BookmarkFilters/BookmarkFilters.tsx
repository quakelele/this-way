import { Card, Col, Input, Row, Select } from 'antd'
import { Search } from 'lucide-react'
import styles from './BookmarkFilters.module.scss'

export const BookmarkFilters = () => {
  return (
    <Card  className={styles.filters}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={12}>
              <Input
                prefix={<Search size={16} />}
                placeholder="Поиск по закладкам..."
                allowClear
              />
            </Col>
            <Col xs={12} md={6}>
              <Select
                style={{ width: '100%' }}
                defaultValue="all"
                options={[
                  { value: 'all', label: 'Все' },
                  { value: 'verse', label: 'Аяты' },
                  { value: 'audio', label: 'Аудио' },
                  { value: 'note', label: 'Заметки' },
                ]}
              />
            </Col>
            <Col xs={12} md={6}>
              <Select
                style={{ width: '100%' }}
                defaultValue="all"
                options={[{ value: 'all', label: 'Все теги' }]}
              />
            </Col>
          </Row>
        </Card>
  )
}
