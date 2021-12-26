import styled from '@emotion/styled';
import { IconButton } from '@mui/material';

export const StyledTable = styled.table`
  border-spacing: 0;
  margin-bottom: 2rem;
  overflow: auto;
  white-space: nowrap;
`;

export const StyledRow = styled.tr`
  max-height: 1rem;
  max-widht: 1rem;
`;

type cellProps = {
  backgroundcolor: string;
  hideBorder?: boolean;
  clickable?: boolean;
};

export const StyledCell = styled.td<cellProps>`
  display: td;
  max-width: 1rem;
  max-height: 1rem;
  width: 1rem;
  height: 1rem;
  background-color: ${(props) => props.backgroundcolor};
  border: ${(props) => (props.hideBorder ? 'none' : '1px solid')};
  border-collapse: collapse;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'auto')};
`;

export const StyledIconButton = styled(IconButton)`
  height: 0.1rem;
  width: 0.6rem;
`;
