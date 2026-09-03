
import { Image } from "react-bootstrap"



const AnalyticsCard = ({title, icon, amount, percent, subtitle, className   }) => {
  return (
    <div className={`p-5 d-flex flex-column gap-5 rounded border border-neutral-200 bg-white ${className}`}>
        <div className='d-flex px-1 align-items-center gap-3'>
            <div>
                <div className={`w-40 square outline-2 p-2 rounded-pill d-inline-flex align-items-center justify-content-center
                        ${
                            title.toLowerCase() === 'total sale' ? 'bg-brand-50 outline-brand-50' :
                            title.toLowerCase() === 'total order' ? 'bg-warning-50 outline-warning-50':
                            title.toLowerCase() === 'total revenue' ? 'bg-success-50 outline-success-50':
                            title.toLowerCase() === 'cancelled order' ? 'bg-error-50 outline-error-50':null
                        }
                    `}>
                    <Image fluid src={icon} alt='' />
                </div>
            </div>
            <div>
                <div className="fs-title fw-semibold text-black">{title}</div>
                <div className="d-flex gap-2 align-items-center">
                    <span>{subtitle}</span>
                    <span className="py-1 px-2 rounded-pill text-success-500 bg-success-50">{percent}%</span>
                </div>
            </div>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
            <div className='fs-h4 fw-semibold text-neutral-800 '>${amount}</div>
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.25 10.25L9.75 2.75M9.75 2.75L4.125 2.75M9.75 2.75V8.375" stroke="#01703C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

        </div>

    </div>
  )
}

export default AnalyticsCard