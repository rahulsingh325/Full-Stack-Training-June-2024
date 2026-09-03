
import { Link, Outlet } from 'react-router-dom'
import Header from '../components/layouts/Header'

const RootLayout = () => {
  return (
    <>
        <div className='vh-100 w-100'>
            <div style={{height:'5.5rem'}}>
                <Header />
            </div>
            <div style={{height:'calc(100vh - 5.5rem)'}} className='bg-neutral-50'>
                <div className='h-100'>
                    <Outlet />
                </div>
            </div>
        </div>
    </>
  )
}

export default RootLayout