import React from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './Graph';
import Navbar       from './Navigation/Navbar';
import GraphPage from './Pages/GraphPage';

function App() {
  const user = {};
  return (
    <div className="App">
      <Navbar 
        drawerOpen={false}
        // drawerOpen={drawerOpen}
        user={/*user ||*/ null}
        // setDrawerOpen={() => setDrawerOpen(true)}
        setDrawerOpen={() => console.log('open')}
      />
      {/* <AppDrawer 
        menuList={menuList}
        drawerOpen={drawerOpen}
        handleDrawerClose={() => setDrawerOpen(false)}
        handleMenuItemClick={() => setMenuList(!menuList)}
      /> */}
      <GraphPage />
    </div>
  );
}

export default App;
