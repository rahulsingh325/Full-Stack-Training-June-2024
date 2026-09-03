function TableCard({ sittingCapacity, status, id, tableNumber, onSelect, selected = false }) {  // if we take odd number it will take 1 less chair capacity



    return (
        <div className="d-flex gap-3 align-items-center" onClick={() => status === 'available' ? onSelect({ id, tableNumber, sittingCapacity, status }) : null} role="button" >
            {/* vertical chair */}
            <div ><span className="w-12 h-30   d-inline-block outline-2 rounded-1"></span></div>
            <div className="d-flex flex-column gap-3 align-items-center ">
                {/* horizontal chair */}
                <div className="d-flex gap-3 ">
                    {Array.from({ length: ((sittingCapacity - 2) / 2) }, (a, index) => index).map(s => (
                        <div key={s}><span className="w-30  h-12 d-inline-block outline-2 rounded-1"></span></div>
                    ))}
                </div>
                <div className={`p-5    align-items-center justify-content-center rounded border  w-100 shadow-sm
                        ${status === 'available' ? 'bg-brand-50' :
                        status === 'occupied' ? 'bg-success-50' :
                            status === 'reserved' ? 'bg-error-50' : null
                    }
                        ${selected ? ' border-2 border-primary' : 'border-1 border-neutral-200'}
                    `}>
                    <div>
                        <div className="w-60 square d-flex align-items-center justify-content-center rounded-circle  bg-white mx-auto">
                            <span className="fs-title fw-semibold">
                                {tableNumber}
                            </span>
                        </div>
                    </div>
                </div>
                {/* horizontal chair */}
                <div className="d-flex gap-3 ">
                    {Array.from({ length: ((sittingCapacity - 2) / 2) }, (a, index) => index).map(s => (
                        <div key={s}><span className="w-30 h-12 d-inline-block outline-2 rounded-1"></span></div>
                    ))}
                </div>
            </div>
            {/* vertical chair */}
            <div><span className="w-12 h-30  d-inline-block outline-2 rounded-1"></span></div>

        </div>
    );
}

export default TableCard;