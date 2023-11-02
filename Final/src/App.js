import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ProductForm from './components/Create_Product';
import Add_category from './components/Create_Categories';
import Delete_Product from './components/Delete_Products';
import Delete_Category from './components/Delete_Categories';
import Update_Product from './components/Update_Products';
import Update_Category from './components/Update_Categories';
import Product from './components/Products';
import Category from './components/Categories';

function App() {
  return (
  <>
        <Router>
          <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/category">Category</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/product">Product</Link>
                </li>
              </ul>
            </nav>
          </div>
            <Routes>
                  <Route path="/product/create" element={<ProductForm/>}></Route>
                  <Route path="/product" element={<Product/>}></Route>
                  <Route path="/update_product/:id" element={<Update_Product/>}></Route>
                  <Route path="/delete_product/:id" element={<Delete_Product/>}></Route>


                  <Route path="/category/create" element={<Add_category/>}></Route>
                  <Route path="/category" element={<Category/>}></Route>
                  <Route path="/update_category/:id" element={<Update_Category/>}></Route>
                  <Route path="/delete_category/:id" element={<Delete_Category/>}></Route>
            </Routes>
      </Router>
  </>
  );
}

export default App;
