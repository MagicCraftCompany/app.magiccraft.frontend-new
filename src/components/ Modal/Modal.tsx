import { IoClose } from 'react-icons/io5'
import { MediaQuery, useDeviceType } from '../../hooks/useDeviceType'
import { Atom, swap, useAtom, deref } from '@dbeining/react-atom'
// import SimpleLoading from '../SimpleLoading'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export type ModalContentProps = { onClose: () => void }
export type ModalData =
  | undefined
  | {
      title: React.ReactNode
      key?: string
      content: (props: ModalContentProps) => React.ReactNode
      justContent?: boolean
      reward?: boolean
      onClose?: () => void
    }

export const modalAtom = Atom.of<ModalData>(undefined)
export const setModal = (data: ModalData) => {
  swap(modalAtom, () => data)
}

export default function Modal() {
  const modal = useAtom(modalAtom)
  function onClose() {
    if (deref(modalAtom)?.title === modal?.title) {
      setModal(undefined)
    }
    modal?.onClose?.()
  }

  const isMobile = useDeviceType(MediaQuery.isMobile)

  const backdrop = (
    <motion.div
      className="fixed left-0 top-0 z-50 h-screen w-screen bg-blue-500/75 backdrop-blur"
      variants={{
        open: {
          backdropFilter: 'blur(6px)',
          opacity: 1,
        },
        close: {
          backdropFilter: 'blur(0px)',
          opacity: 0,
        },
      }}
      initial="close"
      animate="open"
      exit="close"
      // transition={{ type: "spring", stiffness: 100, damping: 20 }}
      onClick={onClose}
    ></motion.div>
  )

  return (
    <>
      <AnimatePresence>
        {modal ? (
          <>
            {backdrop}
            <motion.div
              className="fixed inset-0 z-50 grid h-full w-full place-items-center"
              variants={{
                closed: isMobile
                  ? {
                      opacity: 0,
                      scale: 0.9,
                    }
                  : {
                      opacity: 0,
                      scale: 0.9,
                    },
                open: isMobile
                  ? {
                      opacity: 1,
                      scale: 1,
                    }
                  : {
                      opacity: 1,
                      scale: 1,
                    },
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              initial="closed"
              animate="open"
              exit="closed"
              // className="modal"
              key={
                modal.key || typeof modal.title === 'string'
                  ? (modal.title as string)
                  : undefined
              }
            >
              <span
                className="fixed inset-0 z-20 m-auto -translate-x-1/2 -translate-y-1/2 transform"
                id="rewardId"
                style={{
                  width: 2,
                  height: 2,
                }}
              />
              {!modal.reward ? (
                <div className="modal-scrollbar shadow-modal relative mx-4 max-h-[90%] max-w-5xl overflow-y-auto rounded-3xl border-2 border-[#9AD4FD] bg-gradient-to-b from-[#161242] to-[#060b31f2] px-4 py-10 text-white backdrop-blur-2xl md:mx-4 md:px-8 lg:my-8 lg:px-16">
                  <div
                    className="absolute right-1 top-1 h-fit w-fit cursor-pointer rounded-full p-1 transition hover:bg-white/10 md:right-2 md:top-2 "
                    onClick={() => setModal(undefined)}
                  >
                    <IoClose size={30} onClick={onClose} />
                  </div>
                  {modal.title && (
                    <>
                      <h3 className="pb-6 text-center font-serif text-4xl md:text-[42px]">
                        {modal.title}
                      </h3>

                      {/* <div className="my-9 h-[2px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div> */}
                    </>
                  )}
                  {modal.content({ onClose })}
                </div>
              ) : (
                <div className="px-2">{modal.content({ onClose })}</div>
              )}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}

const LoadingModalContent = ({
  onClose,
  promise,
}: {
  onClose: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promise: Promise<any>
}) => {
  useEffect(() => {
    promise.finally(onClose)
  }, [])

  return (
    <div className="flex justify-center">
      Loading
      {/* <SimpleLoading /> */}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throwLoadingModal(promise: Promise<any>, title = 'Loading') {
  promise.finally()

  setModal({
    title,
    content: ({ onClose }) => (
      <LoadingModalContent onClose={onClose} promise={promise} />
    ),
  })
}
