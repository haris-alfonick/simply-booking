import React, { useRef, useState } from "react";
import { CSVLink } from "react-csv";

export default function ExportCSV({ allData, columns, filename ,btncolor }) {

    return (
        <CSVLink
            data={allData}
            headers={columns}
            filename={`${filename}.csv`}
            className={`px-4 py-2 bg-${btncolor}-500 text-white rounded-lg hover:bg-${btncolor}-600 flex items-center gap-2`}
        >
            Export CSV
        </CSVLink>
    );
}
