import { Flex } from "@mantine/core";
import React, { PropsWithChildren } from "react";
import { TableHead } from "../../types/table";
import HighLightText from "../typography/highlight-text";
import TableComponent from "./table";

interface DataTableProps<T> {
  body: T[][];
  head: TableHead[];
  heading: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTable: React.FC<PropsWithChildren<DataTableProps<any>>> = ({
  children,
  head,
  body,
  heading,
}) => {
  return (
    <Flex
      mih={50}
      gap="md"
      justify="flex-start"
      align="flex-start"
      direction="column"
      wrap="nowrap"
    >
      <HighLightText>{heading}</HighLightText>
      {children}
      <TableComponent head={head} body={body} />
    </Flex>
  );
};

export default DataTable;
