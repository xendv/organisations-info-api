import logo from './logo.svg';
import './css/App.css';
import * as mdb from 'mdb-ui-kit';
import './css/mdb.min.css';
import Nav from './Nav.js';
import DataTable from './DataTable';
import Header from './Header'

function App() {
  return (
    <div className="App">
      <header >
      <Header />
      </header>
      <section className="container">
        <div class ="row">
          <DataTable />
        </div>
      </section>
    </div>
  );
}

export default App;
