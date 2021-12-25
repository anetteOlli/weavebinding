import React, { FC } from 'react';
import { StyledTable, StyledCell } from './components/GridComponents';

interface GridSectionProps {
  rows: Row[] | undefined;
}

export interface Row {
  cells: Cell[];
  color: string;
}

export interface Cell {
  id: number;
  color: string;
}

const Binding: FC<GridSectionProps> = ({ rows }) => {
  return (
    <StyledTable>
      <tbody>
        {rows?.map((row, index) => (
          <tr key={index}>
            {row.cells.map((cell) => (
              <StyledCell backgroundcolor={cell.color} key={cell.id} />
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Binding;
