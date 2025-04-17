import React from 'react';
import './App.css';

import Button from './components/Button';
import Card from './components/Card';

import Typography from './components/Typography';
import { Grid, GridColumn } from './components/Grid';

function App() {
  const toggleDark = () => {
  document.body.classList.toggle('dark-mode');
  };

  return (
    <div>
      <Button variant="secondary" onClick={toggleDark}>Toggle Dark Mode</Button>

      <header className="text-center p-4">
        <h1 className="text-xl font-bold">UI Library</h1>
      <p className="text-base">Showcasing grid, utilities and components</p>
      </header>
      <section className="p-4">
        <h2 className="text-lg font-bold mb-2">12-Column Grid</h2>
        <Grid>
      <GridColumn>Grid 4</GridColumn>
        <GridColumn>Grid 4</GridColumn>
         <GridColumn>Grid 4</GridColumn>
        </Grid>
      </section>



      <section className="p-4">
        <h2 className="text-lg font-bold mb-2">Typography</h2>
   <Typography />
      </section>

      <section className="p-4">
        <h2 className="text-lg font-bold mb-2">Buttons</h2>     
        <button variant="primary" className="btn-primary">Primary</button>
        <Button variant="secondary" className="btn-secondary">Secondary</Button>
        <button
  onClick={() => window.location.href = '/documentation.html'}
  className="btn btn-primary m-2"
>
  View Documentation
</button>



      </section>

      <section className="p-4">
   <h2 className="text-lg font-bold mb-2">Card</h2>
       <Card title="Card Title">
        This is a sample card using utility classes.
  </Card>
      </section>
    </div>
  );
}

export default App;
