import React, { useEffect, useState } from "react";
import { getTransections } from "../api/Api";
import { DataTable } from "./DataTable";

const Transectino = ({ search }) => {
    const [transections, setTransections] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const limit = 10;

    const fetchTransections = async () => {
        try {
            const res = await getTransections({ page, limit, search });
            // console.log(res)
            setTransections(res.data);
            setPagination(res.pagination);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTransections();
    }, [page, search]);


    const transectinosColumns = [
        {
            key: 'customerName',
            label: 'Name',
            render: (_, row) => (
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-500">
                        <span className="text-sm font-medium">{row.customerName.charAt(0)}</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{row.customerName}</p>
                        <p className="text-xs text-gray-500">{row.customerEmail}</p>
                    </div>
                </div>
            )
        },
        {
            key: 'status',
            label: 'Status',
            align: 'center',
            render: (status) => (
                <span className={`text-md font-medium px-3 py-1 rounded-full inline-block ${status === 'success'
                    ? 'bg-green-100 text-green-500 border border-green-300'
                    : status === 'processing'
                        ? 'bg-yellow-100 text-yellow-500 border border-yellow-300'
                        : 'bg-red-100 text-red-500 border border-red-300'
                    }`}>
                    {status}
                </span>
            )
        },
        {
            key: 'createdAt',
            label: 'Date',
            align: 'center',
            render: (date) => new Date(date).toLocaleDateString("en-GB")
        },
        {
            key: 'paypalOrderId',
            label: 'Order Id',
            align: 'center'
        },

        {
            key: 'paypalTransactionId',
            label: 'Transaction Id',
            align: 'center'
        },
        {
            key: 'currency',
            label: 'currency',
            align: 'center'
        },
        {
            key: 'amount',
            label: 'amount',
            align: 'center'
        },
    ];




    return (
        <>
            <DataTable
                columns={transectinosColumns}
                data={transections}
                filters={[
                    { key: 'paypalOrderId', label: 'Order Id' },
                    { key: 'status', label: 'status' }
                ]}
                searchable={true}
                filename="Transections"
                page={page}
                setPage={setPage}
                pagination={pagination}
            />

        </>
    );
};

export default Transectino