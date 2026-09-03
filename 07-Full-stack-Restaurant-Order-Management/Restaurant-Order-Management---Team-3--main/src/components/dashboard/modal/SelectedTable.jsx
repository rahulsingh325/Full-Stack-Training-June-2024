import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import downarrow from "../../../assets/image/icon/downarrow.svg"
import HorizontalDatePicker from '../table/HorizontalDatePicker';

const SelectedTable = ({ show = true, onHide, tables = [], onContinue }) => {
    const [orderType, setOrderType] = useState('runningOrder')
    return (
        <Modal className='ps-0' show={show} onHide={onHide} centered backdrop="static">
            <div >
                <Modal.Header className='p-5 '>
                    <Modal.Title className='d-flex justify-content-between align-items-center w-100'>
                        <div className='d-flex flex-column'>
                            <span className='fs-h5 text-neutral-700 fw-semibold mb-1'>Table Order</span>
                            <span className='fs-title text-neutral-400 '>Order#1234</span>
                        </div>
                        <div>
                            <Form.Select value={orderType} onChange={(e) => setOrderType(e.target.value)} className='text-neutral-700 fs-title p-3 rounded-8 pe-8'>
                                <option value='runningOrder'>Running order</option>
                                <option value='reservation'>Reservation</option>
                            </Form.Select>
                        </div>
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body className="  p-5">
                    {orderType === 'reservation' ? <div className='mb-3 text-neutral-700 fs-title fw-medium '>Number table</div> : null}
                    <div className='d-flex gap-3 mb-8'>
                        {tables.map(table => (
                            <div className='rounded bg-neutral-50 text-neutral-700 fw-medium fs-title py-3 px-6 border border-primary '>
                                {table.tableNumber}
                            </div>
                        ))}
                    </div>
                    {orderType === 'reservation' ?
                        <div className='mb-8'>
                            <div className='mb-3 text-neutral-700 fs-title fw-medium '>Select time</div>
                            <div className='mb-5'>
                                <Form.Select className='text-neutral-700 fs-title p-3 rounded-8 pe-8'>
                                    <option value='09:15'>09:15</option>
                                    <option value='06:15'>06:15</option>
                                    <option value='08:15'>08:15</option>
                                    <option value='12:15'>12:15</option>
                                </Form.Select>
                            </div>
                            <div className='d-flex justify-content-between align-items-center mb-3'>
                                <span className='text-neutral-700 fs-title fw-medium'>Select date</span>
                                <span className='text-neutral-400 fs-body fw-medium '><span className='me-2'>March 2026 </span> <img src={downarrow} alt="" /></span>
                            </div>
                            <div>
                                <HorizontalDatePicker />
                            </div>
                        </div>
                        : null}
                    <div className='d-flex gap-3'>
                        <Button variant='white' onClick={() => onHide()} className='p-3 rounded-pill  flex-grow-1 border'>Cancel</Button>
                        <Button className='p-3 rounded-pill flex-grow-1' onClick={onContinue}>Continue</Button>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    )
}

export default SelectedTable