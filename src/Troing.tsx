import { Button } from '@mui/material';
import React, { useState, useEffect, FC } from 'react';
import { StyledCell, StyledIconButton, StyledRow, StyledTable } from './components/GridComponents';
import DeleteIcon from '@mui/icons-material/Delete';

export const createInitialTroingArray = (veft: number) => {
  const resultTroingMap = new Map<number, number>();
  for (let veftIndex = 0; veftIndex < veft; veftIndex++) {
    resultTroingMap.set(veftIndex, -1);
  }
  return resultTroingMap;
};

interface Troing {
  index: number;
  knyting: number;
}

interface TroingProps {
  veft: number;
  troings: Map<number, number>;
  setTroings: React.Dispatch<React.SetStateAction<Map<number, number>>>;
  numberOfTroing: number;
  setNumberOfTroing: React.Dispatch<React.SetStateAction<number>>;
}

const Troing: FC<TroingProps> = ({ veft, troings, setTroings, numberOfTroing, setNumberOfTroing }) => {
  const [dummyArray, setDummyArray] = useState(new Array(veft).fill(0));
  const [dummyTroingArray, setDummyTroingArray] = useState(new Array(2).fill(0));

  useEffect(() => {
    setTroings(createInitialTroingArray(veft));
    setDummyArray(new Array(veft).fill(0));
  }, [veft]);

  const addTroing = () => {
    setNumberOfTroing((prevState) => prevState + 1);
    setDummyTroingArray((prevState) => [...prevState, 0]);
  };

  const deleteTroing = (troingIndex: number) => {
    const newTroings = new Map<number, number>();
    troings.forEach((value, key) => {
      const newValue = value === troingIndex ? -1 : value > troingIndex ? --value : value;
      newTroings.set(key, newValue);
    });
    setTroings(newTroings);
    const newNumberOfTroings = numberOfTroing - 1;
    setNumberOfTroing(newNumberOfTroings);
    setDummyTroingArray(new Array(newNumberOfTroings >= 0 ? newNumberOfTroings : 0).fill(0));
  };

  const handleTroingCellClick = (veftRow: number, troingNumber: number) => {
    const newTroings = new Map(troings);
    newTroings.set(veftRow, troingNumber);
    setTroings(newTroings);
  };

  const getTroingsCellColor = (veftRow: number, troingsNummer: number) => {
    if (troings.get(veftRow) === troingsNummer) {
      return 'black';
    } else {
      return 'white';
    }
  };

  return (
    <>
      <StyledTable>
        <tbody>
          {dummyArray.map((_element, veftIndex) => (
            <StyledRow key={veftIndex}>
              {dummyTroingArray.map((_element, troingIndex) => (
                <StyledCell
                  key={(veftIndex + 1) * troingIndex}
                  onClick={() => {
                    handleTroingCellClick(veftIndex, troingIndex);
                  }}
                  clickable={true}
                  backgroundcolor={getTroingsCellColor(veftIndex, troingIndex)}
                />
              ))}
            </StyledRow>
          ))}
          <StyledRow>
            {dummyTroingArray.map((_element, index) => (
              <td key={index}>
                <StyledIconButton onClick={() => deleteTroing(index)} color="secondary">
                  <DeleteIcon />
                </StyledIconButton>
              </td>
            ))}
          </StyledRow>
        </tbody>
      </StyledTable>
      <Button onClick={addTroing} variant="outlined" color="primary">
        Legg til Trøying
      </Button>
    </>
  );
};

export default Troing;
