import { Table } from "@mantine/core";
import { TableHead } from "../../types/table";

interface TableComponentProps<T> {
  body: T[][];
  head: TableHead[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableComponent: React.FC<TableComponentProps<any>> = ({ head, body }) => {
  return (
    <Table withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          {head &&
            head.map((item) => (
              <Table.Th key={item.key}>{item.value}</Table.Th>
            ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {body &&
          head &&
          body.map((row, index) => (
            <Table.Tr key={index}>
              {head.map((item) => (
                <Table.Td key={item.key}>{row[item.key]}</Table.Td>
              ))}
            </Table.Tr>
          ))}
      </Table.Tbody>
    </Table>
  );
};

export default TableComponent;
