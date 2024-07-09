import React, { createContext, useState } from 'react'

const ModalContext = createContext({
  activeModal: null,
  setActiveModal: () => {},
  invoiceDrawerOpen: false,
  setInvoiceDrawerOpen: () => {},
  itemProductModalOpen: false,
  setItemProductModalOpen: () => {},
  addProductModalOpen: false,
  setAddProductModalOpen: () => {},
  addServiceModalOpen: false,
  setAddServiceModalOpen: () => {},
  createProductModalOpen: false,
  setCreateProductModalOpen: () => {},
  createServiceModalOpen: false,
  setCreateServiceModalOpen: () => {}
})

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null)
  const [invoiceDrawerOpen, setInvoiceDrawerOpen] = useState(false)
  const [itemProductModalOpen, setItemProductModalOpen] = useState(false)
  const [addProductModalOpen, setAddProductModalOpen] = useState(false)
  const [addServiceModalOpen, setAddServiceModalOpen] = useState(false)
  const [createProductModalOpen, setCreateProductModalOpen] = useState(false)
  const [createServiceModalOpen, setCreateServiceModalOpen] = useState(false)

  const contextValue = {
    activeModal,
    setActiveModal,
    invoiceDrawerOpen,
    setInvoiceDrawerOpen,
    itemProductModalOpen,
    setItemProductModalOpen,
    addProductModalOpen,
    setAddProductModalOpen,
    addServiceModalOpen,
    setAddServiceModalOpen,
    createProductModalOpen,
    setCreateProductModalOpen,
    createServiceModalOpen,
    setCreateServiceModalOpen
  }

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
}

export default ModalContext
