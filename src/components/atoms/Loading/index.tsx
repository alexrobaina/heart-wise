import { FC } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface Props {
  size?: number
  className?: string
  centerScreen?: boolean
}

export const Loading: FC<Props> = ({
  size = 45, // default size in pixels
  className = '',
  centerScreen = true,
}) => {
  return (
    <div
      className={`
        ${centerScreen ? 'fixed inset-0 flex justify-center items-center' : ''}
        ${className}
        flex justify-center items-center
      `}
    >
      <AiOutlineLoading3Quarters
        size={size} // ← pass size prop here
        className="animate-spin text-amber-500"
      />
    </div>
  )
}
