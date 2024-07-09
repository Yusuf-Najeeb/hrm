import React, { useState } from 'react'
import ModalContext from './ModalContext'

function InvoiceProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null)
  const [invoiceData, setInvoiceData] = useState({})
  const [createProductModalOpen, setCreateProductModalOpen] = useState(false)
  const [createServiceModalOpen, setCreateServiceModalOpen] = useState(false)

  const handleOpenModal = modal => setActiveModal(modal)
  const handleCloseModal = () => setActiveModal(null)
  const handleUpdateInvoiceData = data => setInvoiceData(prevData => ({ ...prevData, ...data }))

  // Functions to manage create modals
  const handleOpenCreateProductModal = () => setCreateProductModalOpen(true)
  const handleCloseCreateProductModal = () => setCreateProductModalOpen(false)
  const handleOpenCreateServiceModal = () => setCreateServiceModalOpen(true)
  const handleCloseCreateServiceModal = () => setCreateServiceModalOpen(false)

  const contextValue = {
    activeModal,
    setActiveModal: handleOpenModal,
    invoiceData,
    setInvoiceData: handleUpdateInvoiceData,
    closeModal: handleCloseModal,
    createProductModalOpen,
    setCreateProductModalOpen: handleOpenCreateProductModal,
    handleCloseCreateProductModal,
    createServiceModalOpen,
    setCreateServiceModalOpen: handleOpenCreateServiceModal,
    handleCloseCreateServiceModal
  }

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
}

export default InvoiceProvider
