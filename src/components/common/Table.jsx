import React from 'react';

const Table = ({ columns, data, actions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-slate-900 rounded shadow">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">
                {col.label}
              </th>
            ))}
            {actions && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id || idx} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2">
                  {row[col.key]}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-2 flex gap-2">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
