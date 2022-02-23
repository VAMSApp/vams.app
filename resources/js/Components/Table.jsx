import { Table, }from 'react-bootstrap';
import { useTable, useSortBy, } from 'react-table'

export default function TableComponent({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
        columns,
        data,
    },
    useSortBy
    );

  // Render the UI for your table
  return (
    <Table striped bordered size="sm" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (<th {...column.getHeaderProps([
                {
                    className: column.className,
                    style: column.style,
                }
            ])}>
                {column.render('Header')}
            </th>))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps([
                      {
                          className: cell.column.cellClassName || cell.column.className,
                          style: cell.column.style,
                      }
                  ])}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
