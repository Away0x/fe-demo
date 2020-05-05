import React from 'react';
import logo from './logo.svg';
import './App.css';

import Button from './components/Button';
import { Menu, MenuItem, SubMenu } from './components/Menu';

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          <Button btnType="link" href="asdasd">asdsad</Button>

        </p>
        <Menu defaultOpenSubMenus={['1']}>
          <MenuItem>
            active
          </MenuItem>
          <MenuItem disabled>
              disabled
          </MenuItem>
          <MenuItem>
            xyz
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
              drop1
            </MenuItem>
          </SubMenu>
          <SubMenu index="1" title="opened">
            <MenuItem>
              opened1
            </MenuItem>
          </SubMenu>
        </Menu>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
