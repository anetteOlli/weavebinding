import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { StyledTable } from './components/GridComponents';
import Binding, { Cell, Row } from './GridSection';
import Knytings from './Knytings';
import Skafts from './Skafts';
import Troing, { createInitialTroingArray } from './Troing';

const App = () => {
  const [renning, setRenning] = useState(0);
  const [veft, setVeft] = useState(0);
  const [numberOfSkaft, setNumberOfSkaft] = useState(0);
  const [binding, setBinding] = useState<Row[] | undefined>();
  const [renningColor, setRenningColor] = useState<string[]>([]);
  const [innslagsColor, setInnslagsColor] = useState<string[]>([]);
  const [skafts, setSkafts] = useState<number[][]>([[]]);
  const [troings, setTroings] = useState(createInitialTroingArray(veft));
  const [numberOfTroing, setNumberOfTroing] = useState(2);

  const handleRenningChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!isNaN(+event.target.value)) setRenning(+event.target.value);
  };

  const handleVeftChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!isNaN(+event.target.value)) setVeft(+event.target.value);
  };

  const handleSkaftChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!isNaN(+event.target.value)) setNumberOfSkaft(parseInt(event.target.value));
  };

  const generateInitialBinding = () => {
    const binding: Row[] = [];
    const defaultColor = 'white';
    let active = true;
    for (let renningIndex = 0; renningIndex < renning; renningIndex++) {
      const cells: Cell[] = [];
      for (let veftIndex = 0; veftIndex < veft; veftIndex++) {
        cells.push({ id: (veftIndex + 1) * (renningIndex + 1), color: defaultColor });
        active = !active;
      }

      binding.push({ color: defaultColor, cells: cells });
    }
    setBinding(binding);
    setRenningColor(new Array(renning).fill(defaultColor));
  };

  return (
    <div>
      <TextField onChange={handleRenningChange} variant="outlined" type="number" label="renning (lodrett)" />
      <TextField onChange={handleVeftChange} variant="outlined" type="number" label="veft (horisontalt)" />
      <Button color="primary" variant="contained" onClick={generateInitialBinding}>
        Generer binding
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Binding rows={binding} />
        </Grid>
        <Grid item xs={4}>
          <Troing
            troings={troings}
            setTroings={setTroings}
            veft={veft}
            numberOfTroing={numberOfTroing}
            setNumberOfTroing={setNumberOfTroing}
          />
        </Grid>
        <Grid item xs={8}>
          <Skafts setSkafts={setSkafts} skafts={skafts} renning={renning} />
        </Grid>
        <Grid item xs={4}>
          <Knytings numberOfSkafts={skafts.length} numberOfTroings={numberOfTroing} />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
