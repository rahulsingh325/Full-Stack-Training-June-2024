import React, { useMemo, useState } from 'react';
import TablesLayout from '../../../data/dashbord/TableData';
import TableCard from './TableCard';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import '../../../assets/scss/modules/_dashboard.scss';
import searchIcon from "../../../assets/image/icon/search.svg"
import SelectedTable from "../modal/SelectedTable"

const ROWS = ['A', 'B', 'C'];

function TablePage({ selectedTables, setSelectedTables, onBack }) {
    // Start with no preselected tables
    // const [selectedTables, setSelectedTables] = useState([]);
    const [filter, setFilter] = useState('All table');
    const [query, setQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    const groups = TablesLayout;

    const filtered = useMemo(() => {
        const pass = t => {
            const f =
                filter === 'All table' ||
                (filter === 'Available' && t.status === 'available') ||
                (filter === 'Reserved' && t.status === 'reserved') ||
                (filter === 'Occupied' && t.status === 'occupied');
            const q = t.tableNumber.toLowerCase().includes(query.toLowerCase().trim());
            return f && q;
        };
        return groups.map(g => ({ row: g.row, tables: g.tables.filter(pass) }));
    }, [groups, filter, query]);



    const tableToggle = (table) => {
        if (selectedTables.some(t => t.id === table.id)) {
            setSelectedTables(selectedTables.filter(t => t.id != table.id))
        } else {
            setSelectedTables([...selectedTables, table])
        }

    }




    return (
        <Container fluid className=" p-8 table-page position-relative">

            {selectedTables.length ? <Button onClick={() => setShowModal(true)} className='position-fixed bottom-0 rounded-2 end-0 me-8 mb-8'>Continue</Button> : null}
            <Row className="align-items-center  justify-content-between mb-7 row-gap-3">
                <Col xxl={3}>
                    <h4 className=" fs-h4">Select table</h4>
                </Col>

                <Col xxl={9}>
                    <Row className=' align-items-center justify-content-end row-gap-3'>
                        <Col xl={6} lg={8} className='me-auto'>
                            <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center me-4 column-gap-7 row-gap-2">
                                <span className="d-inline-flex align-items-center gap-2">
                                    <span className="rounded-circle bg-brand-500 d-inline-block p-2" /> Available table
                                </span>
                                <span className="d-inline-flex align-items-center gap-2">
                                    <span className="rounded-circle bg-error-500 d-inline-block p-2" /> Reserved table
                                </span>
                                <span className="d-inline-flex align-items-center gap-2">
                                    <span className="rounded-circle bg-success-500 d-inline-block p-2" /> Occupied table
                                </span>
                            </div>
                        </Col>
                        <Col xl={6} lg={8} className='me-auto'>
                            <Row className=" align-items-center row-gap-2 ">
                                <Col sm={4} className=' '>
                                    <Form.Select
                                        className="form-select form-select-sm p-3 rounded-8 fs-title text-nowrap"
                                        value={filter}
                                        onChange={e => setFilter(e.target.value)}
                                    >
                                        <option>All table</option>
                                        <option>Available</option>
                                        <option>Reserved</option>
                                        <option>Occupied</option>
                                    </Form.Select>
                                </Col>

                                <Col sm={8} className="  ">
                                    <InputGroup className='rounded-8 p-0 '>
                                        <InputGroup.Text className="bg-white border-end-0 ">
                                            <img src={searchIcon} alt="this is search icon" />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            className="form-control p-3 fs-title  border-start-0"
                                            placeholder="Search"
                                            value={query}
                                            onChange={e => setQuery(e.target.value)}
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className="border rounded-3 bg-white p-8 ">
                <div className='p-2 d-flex flex-column row-gap-108'>
                    {ROWS.map(r => {
                        const group = filtered.find(g => g.row === r) || { row: r, tables: [] };
                        return (
                            <div key={r} className="d-flex align-items-center flex-column flex-sm-row  mb-1">
                                <div className="flex-grow-1 order-1 order-sm-0 me-sm-8">
                                    <div className='d-flex justify-content-center align-items-center justify-content-md-between flex-wrap'>
                                        {group.tables.map(t => (
                                            <div className="table-card" key={t.id}>
                                                <TableCard {...t} onSelect={tableToggle} selected={selectedTables.some(tb => tb.id === t.id)} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="ms-sm-8 mb-5 mb-sm-0">
                                    <div className="border bg-light rounded d-flex justify-content-center align-items-center w-80 square">
                                        <span className="fw-semibold">{r}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <SelectedTable show={showModal} tables={selectedTables} onHide={() => setShowModal(false)} onContinue={onBack} />
        </Container>
    );
}

export default TablePage;