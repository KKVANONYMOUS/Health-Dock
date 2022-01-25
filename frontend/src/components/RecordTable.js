import styled from 'styled-components'

const TableContainer = styled.div`
  max-width: 800px;
  width: 90%;
  margin: 0 auto 40px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHeadBox = styled.thead`
  background-color: transparent;

  @media (max-width: 767px) {
    display: none;
  }
`

const TableRow = styled.tr`
  background-color: transparent;

  &:nth-child(even) {
    background-color: #f1f1f1;
  }

  @media (max-width: 767px) {
    display: block;
    margin-bottom: 20px;
  }
`

const TableHeading = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 0.9rem;

  @media (max-width: 767px) {
    display: block;
    margin-bottom: 5px;
  }
`

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 0.75rem;

  @media (max-width: 767px) {
    display: block;
    position: relative;
    padding-left: 132px;
    text-align: left;
    border-bottom: 0;
    font-size: 0.7rem;

    &:last-child {
      border-bottom: 1px solid #ddd;
    }

    &:before {
      content: attr(data-heading);
      position: absolute;
      top: 0;
      left: 0;
      width: 120px;
      height: 100%;
      display: flex;
      align-items: center;
      background-color: #2dd6c1;
      color: #000;
      font-weight: 800;
      font-size: 0.75rem;
      padding: 0 5px;
      justify-content: center;
    }
  }
`

const TableBody = styled.tbody``

const RecordTable = ({ tableData, headingColumns }) => {
  const data = tableData.map((row, index) => {
    let rowData = []
    let i = 0

    for (const key in row) {
      rowData.push({
        key: headingColumns[i],
        val: row[key],
      })
      i++
    }

    return (
      <TableRow key={index}>
        {rowData.map((data, index) => (
          <TableData key={index} data-heading={data.key}>
            {data.val}
          </TableData>
        ))}
      </TableRow>
    )
  })

  return (
    <TableContainer>
      <Table>
        <TableHeadBox>
          <TableRow>
            {headingColumns.map((col, index) => (
              <TableHeading key={index}>{col}</TableHeading>
            ))}
          </TableRow>
        </TableHeadBox>
        <TableBody>{data}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default RecordTable
