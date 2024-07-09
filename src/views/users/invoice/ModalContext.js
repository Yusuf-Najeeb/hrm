import React, { createContext, useState } from 'react'

const ModalContext = createContext({
  activeModal: null,
  setActiveModal: () => {},
  invoiceDrawerOpen: false,
  setInvoiceDrawerOpen: () => {},
  itemProductModalOpen: false,
  setItemProductModalOpen: () => {}
})

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null)
  const [invoiceDrawerOpen, setInvoiceDrawerOpen] = useState(false)
  const [itemProductModalOpen, setItemProductModalOpen] = useState(false)

  const contextValue = {
    activeModal,
    setActiveModal,
    invoiceDrawerOpen,
    setInvoiceDrawerOpen,
    itemProductModalOpen,
    setItemProductModalOpen
  }

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
}

export default ModalContext
