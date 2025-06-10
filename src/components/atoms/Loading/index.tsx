import { FC } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface Props {
  size?: number
}
export const Loading: FC<Props> = ({ size = 10 }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <AiOutlineLoading3Quarters
        className={`animate-spin h-${size} w-${size} text-amber-500`}
      />
    </div>
  )
}
