import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/Api";
import { DataTable } from "./DataTable";

const User = ({ search }) => {
    const [transections, setTransections] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const limit = 10;

    const fetchTransections = async () => {
        try {
            const res = await getAllUsers({ page, limit, search });
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
            key: 'fullname',
            label: 'Name',
            render: (_, row) => (
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-500">
                        <span className="text-sm font-medium">{row.fullname.charAt(0)}</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{row.fullname}</p>
                        <p className="text-xs text-gray-500">{row.email}</p>
                    </div>
                </div>
            )
        },
        {
            key: 'isVerified',
            label: 'Is Verified',
            align: 'center',
            render: (isVerified) => (
                <span className={`text-md font-medium px-3 py-1 rounded-full inline-block ${isVerified === true
                    ? 'bg-green-100 text-green-500 border border-green-300'
                    : 'bg-red-100 text-red-500 border border-red-300'
                    }`}>
                    {isVerified.toString()}
                </span>
            )
        },
        {
            key: 'role',
            label: 'Role',
            align: 'center',
            render: (role) => (
                <span className={`text-md font-medium px-3 py-1 rounded-full inline-block ${role === 1
                    ? 'bg-cyan-100 text-cyan-500 border border-cyan-300'
                    : 'bg-yellow-100 text-yellow-500 border border-yellow-300'
                    }`}>
                    {role === 1 ? "Administrator" : "User"}
                </span>
            )
        },
        {
            key: 'createdAt',
            label: 'Date',
            align: 'center',
            render: (date) => new Date(date).toLocaleDateString("en-GB")
        },
    ];




    return (
        <>
            <DataTable
                columns={transectinosColumns}
                data={transections}
                filters={[
                    { key: 'location', label: 'Location' },
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

export default User