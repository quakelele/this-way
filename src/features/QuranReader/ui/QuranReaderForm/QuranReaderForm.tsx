import { Button, Form, Input, Select } from 'antd'
import styles from './QuranReaderForm.module.scss'
import { options, TranslationOption } from 'features/QuranSearch/utils/options'
import { SearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'shared/hooks/useTranslation'
import { SearchFormTypes } from 'shared/model/types'
import { surahOptions } from 'features/QuranReader/constants/surahs'

export const QuranReaderForm = () => {
  const [form] = Form.useForm()

  const onFinish = (values: SearchFormTypes) => {
    console.log(values)
  }
  const { t } = useTranslation()

  return (
    <Form
      className={styles.searchCard}
      form={form}
      name="complex-form"
      onFinish={onFinish}
      layout="vertical">
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

      <Form.Item name="chapter_id">
        <Select
          className={styles.select}
          // value={chapterId}
          // onChange={handleChapterChange}
          showSearch
          optionFilterProp="label"
          filterOption={(input, option) =>
            (option?.label as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={surahOptions.map(option => ({
            value: option.value,
            label: `${t('Сура')} ${option.value}: ${t(option.label.russian)} (${
              option.label.arabic
            })`,
          }))}
          popupMatchSelectWidth={false}
        />
      </Form.Item>
    </Form>
  )
}
