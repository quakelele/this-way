import { Button, Form, Select, Input, Spin } from 'antd'
import { options, TranslationOption } from 'features/QuranSearch/utils/options'
import { SearchFormTypes } from 'shared/model/types'
import { SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
import styles from './QuranSearchForm.module.scss'
import { useTranslation } from 'shared/hooks/useTranslation'

type Props = {
  setQuery: (arg: SearchFormTypes) => void
  isLoading: boolean
}

export const QuranSearchForm = ({ setQuery, isLoading }: Props) => {
  const { t } = useTranslation()
  const [isTouched, setIsTouched] = useState(false)

  const [form] = Form.useForm()

  const onFinish = (values: SearchFormTypes) => {
    const { translationId, searchText, selectedLanguage } = values
    setQuery({
      translationId,
      searchText,
      selectedLanguage,
    })

  }
  return (
    <Form
      className={styles.searchCard}
      form={form}
      name="complex-form"
      onFinish={onFinish}
      layout="vertical"
      onFieldsChange={() => {
        const { searchText } = form.getFieldsValue()
        setIsTouched(!!searchText?.trim())
      }}>
      <Form.Item
        name="selectedLanguage"
        hidden>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item
        label={t('Язык перевода')}
        name="translationId"
        className={styles.formItem}
        rules={[{ required: true, message: t('Пожалуйста выберите язык') }]}>
        <Select
          className={styles.select}
          options={options}
          placeholder={t('Выберите язык')}
          onChange={(value, option) => {
            const selected = option as TranslationOption
            form.setFieldsValue({
              translationId: value,
              selectedLanguage: selected.selectedLanguage, // 👈 translationId вручную
            })
          }}
        />
      </Form.Item>

      <Form.Item
        label={t('Поиск по тексту')}
        className={styles.formItem}
        name="searchText"
        rules={[
          { required: true, message: t('Пожалуйста введите значение для поиска') },
          { min: 3, message: t('Минимальное значение - 3') },
        ]}>
        <Input
          placeholder={t('Введите слово или фразу...')}
          suffix={<SearchOutlined className={styles.searchIcon} />}
          className={styles.input}
        />
      </Form.Item>

      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          disabled={!isTouched || isLoading}
          className={styles.searchButton}
          icon={isLoading ? <Spin size="small" /> : <SearchOutlined />}>
          {isLoading ? t('Поиск...') : t('Найти аяты')}
        </Button>
      </Form.Item>
    </Form>
  )
}
