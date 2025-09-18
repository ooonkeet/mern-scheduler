import { Button } from '@/components/ui/button';

export default function Table({ columns, data, onEdit, onDelete }) {
   
  const tableData = Array.isArray(data) ? data : [];

  const columnKeyMap = {
    Name: 'name',
    Program: 'program',
    'Student Intake': 'studentIntake',
    'Number of Sections': 'numberOfSections',
    Year: 'year',
    Semester: 'semester',
    'Total Students': 'totalStudents',
    Stream: 'stream',
    'Class Duration': 'class duration',
    'Break Time': 'break time',
    'Class Days': 'class days',
    Code: 'code',
    Type: 'type',
    Credits: 'credits',
    'Classes/Week': 'classes per week'
  };

  return (
    <table className="w-full table-auto border border-gray-200">
      {/* <thead className="bg-gray-100"> */}
      <thead className="bg-purple-100 text-purple-900">
        <tr>
          {columns.map((col) => (
            <th key={col} className="px-4 py-2 text-left">
              {col}
            </th>
          ))}
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tableData.length === 0 ? (
          <tr className="text-left">
            <td
              colSpan={columns.length + 1}
              className="text-center px-5 py-4 text-gray-500"
            >
              No data available
            </td>
          </tr>
        ) : (
          tableData.map((row) => (
            <tr key={row._id || Math.random()} className="border-t">
              {columns.map((col) => {
                const fieldKey = columnKeyMap[col] || col.toLowerCase();
                const value = row[fieldKey];
                const displayValue =
                  value && typeof value === 'object'
                    ? value.name || JSON.stringify(value)
                    : value ?? 'N/A';

                return (
                  <td key={col} className="px-5 py-4">
                    {displayValue}
                  </td>
                );
              })}
              <td className="px-3 py-4 flex gap-4">
                <Button size="sm" variant="outline" onClick={() => onEdit(row)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(row._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}