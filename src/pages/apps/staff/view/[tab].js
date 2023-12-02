// ** Third Party Imports
import axios from 'axios'
import StaffViewPage from 'src/views/apps/staff/view/StaffViewPage'

const StaffView = ({ tab, invoiceData }) => {
  return <StaffViewPage tab={tab} invoiceData={invoiceData} />
}

export const getStaticPaths = () => {
  return {
    paths: [{ params: { tab: 'info' } }, { params: { tab: 'security' } }],
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const res = await axios.get('/apps/invoice/invoices')
  const invoiceData = res.data.allData

  return {
    props: {
      invoiceData,
      tab: params?.tab
    }
  }
}

export default StaffView
