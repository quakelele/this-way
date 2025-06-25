import { useState } from 'react'
import styles from './QuranReader.module.scss'
import { useGetAyahsQuery } from 'features/QuranReader/api/quranApi'
import { AyahCardQuran } from 'entities'
import { Spin, Select, Form } from 'antd'
import { surahOptions } from 'features/QuranReader/constants/surahs'
import { Pagination } from 'features/Pagination/ui/Pagination/Pagination'

export const QuranReader = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [chapterId, setChapterId] = useState(1)

  const { data, isLoading, isFetching } = useGetAyahsQuery(
    { chapterId, page: currentPage },
    { refetchOnMountOrArgChange: true }
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleChapterChange = (value: number) => {
    setChapterId(value)
    setCurrentPage(1)
  }
  console.log(data)
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Чтение Корана</h1>
      </header>

      <section className={styles.controls}>
        <Form layout="vertical">
          <Form.Item label="Сура">
            <Select
            getPopupContainer={trigger => trigger.parentNode}
              className={styles.select}
              value={chapterId}
              onChange={handleChapterChange}
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={surahOptions.map(option => ({
                value: option.value,
                label: `Сура ${option.value}: ${option.label.russian} (${option.label.arabic})`,
              }))}
            />
          </Form.Item>
        </Form>
      </section>

      <section className={styles.content}>
        {(isLoading || isFetching) && (
          <div className={styles.status}>
            <Spin />
            <p className={styles.loadingText}>Загрузка аятов...</p>
          </div>
        )}

        {!isLoading &&
          !isFetching &&
          data?.verses?.map(ayah => (
            <AyahCardQuran
              key={ayah.id}
              ayah={ayah}
            />
          ))}

        {!isLoading && !isFetching && data?.pagination?.total_pages > 1 && (
          <Pagination
            currentPage={data?.pagination?.current_page}
            totalPages={data?.pagination.total_pages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </main>
  )
}
