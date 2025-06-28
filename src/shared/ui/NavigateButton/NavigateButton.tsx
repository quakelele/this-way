import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router'
import styles from './NavigateButton.module.scss'
type Props = {
  type?: string
}

export const NavigateButton = ({ type }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      {type === 'left' ? (
        <button
          onClick={() => navigate(-1)}
          className={styles.backBtn}>
          <ArrowLeft size={18} />
          Назад
        </button>
      ) : (
        <button
          onClick={() => navigate(+1)}
          className={styles.backBtn}>
          <ArrowRight size={18} />
          Вперёд
        </button>
      )}
    </>
  )
}
