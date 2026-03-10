import logo from './logo.svg';
import './App.css';
import ProductList from './components/ProductList';
import UploadCSV from './components/UploadCSV';

function App() {
  return (
    <div className="container">

    <h1>Product Management System</h1>

    <UploadCSV/>

    <ProductList/>

  </div>
  );
}

export default App;
