import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'
import Modal from 'react-modal'

import { IconClose } from '../../../assets/icons'
import useScreenWidth from 'hooks/useScreenWidth'

interface Props {
  title?: string | ReactNode
  isOpen: boolean
  children: ReactNode
  description?: string
  buttonClose?: boolean
  width?: string | number
  height?: string | number
  closeModal?: () => void
}
export const ReactModal: FC<Props> = ({
  title,
  isOpen,
  children,
  height = '90%',
  closeModal,
  description,
  buttonClose = false,
}) => {
  const isScreenSmall = useScreenWidth(780)

  const makeDinamicWidth = () => {
    if (isScreenSmall) {
      return '95%'
    }
    return '450px'
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      border: 'none',
      height: height,
      marginRight: '-50%',
      borderRadius: '4px',
      width: makeDinamicWidth(),
      backgroundColor: 'white',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      zIndex: 50,
      background: 'rgba(0,0,0,0.7)',
    },
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      style={customStyles}
      onRequestClose={closeModal}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ ease: 'easeOut' }}
        className="flex flex-col md:p-2 bg-white"
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            {title && (
              <h2 className="text-gray-800 text-2xl font-medium">{title}</h2>
            )}
            {description && <p className="text-gray-500">{description}</p>}
          </div>
          {buttonClose && (
            <div role="button" onClick={closeModal} className="text-gray-800">
              <IconClose />
            </div>
          )}
        </div>
        <div className="flex flex-col h-full">{children}</div>
      </motion.div>
    </Modal>
  )
}
