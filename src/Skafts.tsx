import { Button } from '@mui/material';
import React, { useState, FC, useEffect } from 'react';
import { StyledCell, StyledIconButton, StyledRow, StyledTable } from './components/GridComponents';
import DeleteIcon from '@mui/icons-material/Delete';
import clone from 'just-clone';
import styled from '@emotion/styled';

interface SkaftsProps {
  renning: number;
  skafts: number[][];
  setSkafts: React.Dispatch<React.SetStateAction<number[][]>>;
}

const Skafts: FC<SkaftsProps> = ({ renning, skafts, setSkafts }) => {
  //Starter med at man har ett skaft (det absolutte minimum)

  const [dummyArray, setDummyArray] = useState(new Array(renning).fill(0));

  useEffect(() => {
    setDummyArray(new Array(renning).fill(0));
  }, [renning]);

  const addSkaft = () => {
    setSkafts((prevState) => [...prevState, []]);
  };

  const deleteSkaft = (skaftIndex: number) => {
    setSkafts((prevState) => prevState.filter((_element, index) => index !== skaftIndex));
  };

  const toggleActive = (skaftRowIndex: number, cellIndex: number) => {
    const newSkafts = clone(skafts);
    if (newSkafts[skaftRowIndex].some((active) => active === cellIndex)) {
      newSkafts[skaftRowIndex] = skafts[skaftRowIndex].filter((active) => active !== cellIndex);
      setSkafts(newSkafts);
    } else {
      newSkafts.forEach((skaft, skaftIndex) => {
        newSkafts[skaftIndex] = skaft.filter((active) => active !== cellIndex);
      });
      newSkafts[skaftRowIndex].push(cellIndex);
      setSkafts(newSkafts);
    }
  };

  return (
    <>
      <StyledTable>
        <tbody>
          {skafts.map((skaftRow, skaftRowIndex) => (
            <StyledRow key={skaftRowIndex}>
              {dummyArray.map((_dummyElement, dummyIndex) => (
                <StyledCell
                  key={(skaftRowIndex + 1) * (dummyIndex + 1)}
                  onClick={() => {
                    toggleActive(skaftRowIndex, dummyIndex);
                  }}
                  backgroundcolor={skaftRow.some((active) => active === dummyIndex) ? 'black' : 'white'}
                  clickable={true}
                />
              ))}
              <td key={skaftRowIndex}>
                <StyledIconButton size="small" onClick={() => deleteSkaft(skaftRowIndex)} color="secondary">
                  <DeleteIcon />
                </StyledIconButton>
              </td>
            </StyledRow>
          ))}
        </tbody>
      </StyledTable>
      <Button variant="outlined" color="primary" onClick={addSkaft}>
        Legg til skaft
      </Button>
    </>
  );
};

export default Skafts;
