import { FC } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface Props {
  size?: number
  centerScreen?: boolean
}
export const Loading: FC<Props> = ({ size = 10, centerScreen = true }) => {
  return (
    <div
      className={`${centerScreen && 'fixed inset-0'} flex justify-center items-center`}
    >
      <AiOutlineLoading3Quarters
        className={`animate-spin h-${size} w-${size} text-amber-500`}
      />
    </div>
  )
}
