import { LuChevronDown } from 'react-icons/lu'

import { useState } from 'react'
// import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NavMenuProps } from './Header'

const NavMenuMobile = ({ item, closeSidebar }: NavMenuProps) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
  return (
    <div>
      <div
        className="flex cursor-pointer items-center gap-2 "
        onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
      >
        <div className=" grid h-auto w-6 shrink-0 place-items-center">
          <img className="w-full" src={item.icon} alt={item.title} />
        </div>
        <span className="text-[22px] font-normal">{item.title}</span>
        <LuChevronDown
          size={23}
          className={`transition-all ${isSubmenuOpen && 'rotate-180'}`}
        />
      </div>
      <AnimatePresence>
        {isSubmenuOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
            }}
            className="flex flex-col gap-y-2"
          >
            {item.submenu.map((subItem) => {
              return (
                <a
                  onClick={closeSidebar}
                  href={subItem.path}
                  key={subItem.title}
                  rel="noreferrer noopener"
                  className="pl-4 pt-5"
                >
                  <div className="flex h-full w-full cursor-pointer items-center gap-2">
                    <div className="grid w-5 shrink-0 place-items-center">
                      <img
                        className="max-w-full"
                        src={subItem.icon}
                        alt={subItem.title}
                      />
                    </div>
                    <p className="text-lg font-bold drop-shadow-md">
                      {subItem.title}
                    </p>
                  </div>
                </a>
              )
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default NavMenuMobile
