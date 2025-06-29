import { SelectOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select } from 'antd'
import { SettingItem } from 'features/Settings/ui/SettingItem/SettingItem'
import styles from './Localization.module.scss'

import { setLanguage } from 'app/store/slice/languageSlice'
import { useTranslation } from 'shared/hooks/useTranslation'
import { useDispatch, useSelector } from 'react-redux'
import { localeOptions, LocalizationOptions } from '../utils/localeOptions'

export const Localization = () => {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { selectedLanguage } = useSelector(state => state.language.lang )
  const dispatch = useDispatch()

  const onFinish = (values: { selectedLanguage: string; localLanguage: string }) => {
    console.log("form local storage", values)
    dispatch(setLanguage(values))
  }

  return (
    <SettingItem
      icon={SelectOutlined}
      title={t('Выберите язык')}
      description={
        selectedLanguage ? (
          <em className={styles.manual}>
            {t('Выбранный язык')}: {selectedLanguage}
          </em>
        ) : (
          <span className={styles.auto}>
            {t('По умолчанию')}: {!selectedLanguage && 'Русский'}
          </span>
        )
      }
    >
      <Form
        onFinish={onFinish}
        form={form}
        layout="vertical"
        className={styles.form}
      >
        <Form.Item name="selectedLanguage" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="translationLanguage" hidden>
          <Input type="hidden" />
        </Form.Item>

        <Form.Item name="localLanguage">
          <Select
            // defaultValue={'Русский'}
            className={styles.select}
            options={localeOptions}
            onChange={(value, option) => {
              const selected = option as LocalizationOptions
              form.setFieldsValue({
                localLanguage: value,
                selectedLanguage: selected.selectedLanguage,
                translationLanguage: selected.translationLanguage,
              })
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button className={styles.submitButton} htmlType="submit">
            {t('Применить')}
          </Button>
        </Form.Item>
      </Form>
    </SettingItem>
  )
}