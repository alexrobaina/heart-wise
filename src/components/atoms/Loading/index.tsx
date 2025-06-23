import { FC } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface Props {
  size?: number
  className?: string
  centerScreen?: boolean
}
export const Loading: FC<Props> = ({
  size = 10,
  className,
  centerScreen = true,
}) => {
  return (
    <div
      className={`${centerScreen && 'fixed inset-0'} ${className} h-${size} w-${size} flex justify-center items-center`}
    >
      <AiOutlineLoading3Quarters className={`animate-spin text-amber-500`} />
    </div>
  )
}
