import { Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { pagePaths } from '../pages';

export function Root() {
  return (
    <div className="row h-100">
      <div id="sidebar" className="col-2 border p-4 h-100">
        <nav>
          <ul style={{listStyleType:'none'}}>
            <li>
              <Button href={pagePaths.home}>Home</Button>
            </li>
            <br/>
            <li>
              <Button href={pagePaths.createNewPlayer}>Create new player</Button>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail" className="border col-9 h-100">
        <Outlet />
      </div>
    </div>
  );
}
