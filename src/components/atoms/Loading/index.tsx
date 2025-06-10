import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <AiOutlineLoading3Quarters className="animate-spin h-10 w-10 text-amber-500" />
    </div>
  )
}
