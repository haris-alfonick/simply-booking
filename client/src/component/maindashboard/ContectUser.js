import React, { useEffect, useState } from "react";
import { getContacts } from "../api/Api";
import { DataTable } from "./DataTable";

const ContectUser = ({ search }) => {
    const [transections, setTransections] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const limit = 10;

    const fetchTransections = async () => {
        try {
            const res = await getContacts({ page, limit, search });
            setTransections(res.data);
            setPagination(res.pagination);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTransections();
    }, [page, search]);


    const ContectColumns = [
        {
            key: 'fullName',
            label: 'Name',
            render: (_, row) => (
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-500">
                        <span className="text-sm font-medium">{row.fullName.charAt(0)}</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{row.fullName}</p>
                        <p className="text-xs text-gray-500">{row.email}</p>
                    </div>
                </div>
            )
        },
        {
            key: 'createdAt',
            label: 'Date',
            align: 'center',
            render: (date) => new Date(date).toLocaleDateString("en-GB")
        },
        {
            key: 'subject',
            label: 'subject',
            align: 'center'
        },
        {
            key: 'message',
            label: 'message',
            align: 'center'
        },

    ];

    return (
        <>
            <DataTable
                columns={ContectColumns}
                data={transections}
                filters={[{ key: 'subject', label: 'subject' }]}
                searchable={true}
                filename="Transections"
                page={page}
                setPage={setPage}
                pagination={pagination}
            />

        </>
    );
};

export default ContectUser