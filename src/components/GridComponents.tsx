import styled from '@emotion/styled';

export const StyledTable = styled.table`
  border-spacing: 0;
  margin-bottom: 2rem;
  overflow: auto;
  white-space: nowrap;
`;

type cellProps = {
  backgroundcolor: string;
  hideBorder?: boolean;
  clickable?: boolean;
};

export const StyledCell = styled.td<cellProps>`
  width: 1rem;
  height: 1rem;
  background-color: ${(props) => props.backgroundcolor};
  border: ${(props) => (props.hideBorder ? 'none' : '1px solid')};
  border-collapse: collapse;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'auto')};
`;
