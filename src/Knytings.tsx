import { Style } from '@mui/icons-material';
import React, { FC, useState, useEffect } from 'react';
import { StyledCell, StyledRow, StyledTable } from './components/GridComponents';

const getKnyteMapCellColor = (skaftIndex: number, troingsIndex: number, knyteMap: Map<number, number[]>) => {
  const skaftNumbers = knyteMap.get(troingsIndex);
  if (skaftNumbers && skaftNumbers.some((skaft) => skaft === skaftIndex)) {
    return 'black';
  } else {
    return 'white';
  }
};

const generateEmptyKnyteMap = (numberOfTroings: number) => {
  const knyteMap = new Map<number, number[]>();
  for (let troingsIndex = 0; troingsIndex < numberOfTroings; troingsIndex++) {
    knyteMap.set(troingsIndex, []);
  }
  return knyteMap;
};

interface KnytingsProps {
  numberOfSkafts: number;
  numberOfTroings: number;
}

const Knytings: FC<KnytingsProps> = ({ numberOfSkafts, numberOfTroings }) => {
  const [knyteMap, setKnyteMap] = useState(generateEmptyKnyteMap(numberOfTroings));
  const [dummySkaftLengtArray, setDummySkaftsArray] = useState(new Array(numberOfSkafts).fill(0));
  const [dummyTroingsLengthArray, setDummyTroingsArray] = useState(new Array(numberOfTroings).fill(0));

  useEffect(() => {
    setKnyteMap(generateEmptyKnyteMap(numberOfTroings));
    setDummySkaftsArray(new Array(numberOfSkafts).fill(0));
    setDummyTroingsArray(new Array(numberOfTroings).fill(0));
  }, [numberOfTroings, numberOfSkafts]);

  const handleKnytingCellClick = (troingsIndex: number, skaftIndex: number) => {
    console.log(troingsIndex, skaftIndex);
    const newKnyteMap = new Map(knyteMap);
    const skaftsNumbers = knyteMap.get(troingsIndex);
    if (skaftsNumbers && skaftsNumbers.some((skaft) => skaft === skaftIndex)) {
      newKnyteMap.set(troingsIndex, [...skaftsNumbers.filter((skaft) => skaft !== skaftIndex)]);
    } else if (skaftsNumbers) {
      newKnyteMap.set(troingsIndex, [...skaftsNumbers, skaftIndex]);
    } else {
      newKnyteMap.set(troingsIndex, [skaftIndex]);
    }
    setKnyteMap(newKnyteMap);
  };

  console.log('knytemap', knyteMap);

  return (
    <>
      <StyledTable>
        <tbody>
          {dummySkaftLengtArray.map((_element, skaftIndex) => (
            <StyledRow key={skaftIndex}>
              {dummyTroingsLengthArray.map((_element, troingsIndex) => (
                <StyledCell
                  key={(skaftIndex + 1) * troingsIndex}
                  onClick={() => handleKnytingCellClick(troingsIndex, skaftIndex)}
                  clickable={true}
                  backgroundcolor={getKnyteMapCellColor(skaftIndex, troingsIndex, knyteMap)}
                />
              ))}
            </StyledRow>
          ))}
        </tbody>
      </StyledTable>
    </>
  );
};

export default Knytings;
