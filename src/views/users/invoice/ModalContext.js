import React, { createContext, useState } from 'react'

export const ModalContext = createContext({
  activeModal: null, // Currently active modal (e.g., 'newInvoice', 'itemProduct', 'addProduct', etc.)
  setActiveModal: modal => {},
  invoiceData: {}, // Data for the invoice being created
  setInvoiceData: data => {},
  createProductModalOpen: false,
  setCreateProductModalOpen: isOpen => {},
  createServiceModalOpen: false,
  setCreateServiceModalOpen: isOpen => {},
  invoiceDrawerOpen: false, // State for drawer
  setInvoiceDrawerOpen: isOpen => {}
})

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null)
  const [createProductModalOpen, setCreateProductModalOpen] = useState(false)
  const [createServiceModalOpen, setCreateServiceModalOpen] = useState(false)
  const [invoiceDrawerOpen, setInvoiceDrawerOpen] = useState(false)

  const contextValue = {
    activeModal,
    setActiveModal,
    createProductModalOpen,
    setCreateProductModalOpen,
    createServiceModalOpen,
    setCreateServiceModalOpen,
    invoiceDrawerOpen,
    setInvoiceDrawerOpen
  }

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
}

export default ModalContext
