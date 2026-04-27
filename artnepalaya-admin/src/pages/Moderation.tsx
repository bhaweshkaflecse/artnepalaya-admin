import React, { useState } from 'react';

export const Moderation = () => {
  const [reports] = useState([
    { id: '1', type: 'Post', reason: 'Unmarked AI Content', reporter: 'user_xyz', status: 'Pending' },
    { id: '2', type: 'User', reason: 'Inappropriate Profile', reporter: 'art_lover_1', status: 'Pending' },
  ]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="p-4 font-medium text-gray-600">Report ID</th>
            <th className="p-4 font-medium text-gray-600">Target Type</th>
            <th className="p-4 font-medium text-gray-600">Reason</th>
            <th className="p-4 font-medium text-gray-600">Status</th>
            <th className="p-4 font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
              <td className="p-4 text-sm font-mono text-gray-500">#{report.id}</td>
              <td className="p-4 text-sm">{report.type}</td>
              <td className="p-4 text-sm text-accent font-medium">{report.reason}</td>
              <td className="p-4">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                  {report.status}
                </span>
              </td>
              <td className="p-4 space-x-2">
                <button className="text-xs bg-black text-white px-3 py-1 rounded">Review</button>
                <button className="text-xs bg-accent text-white px-3 py-1 rounded">Remove Entity</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};