// App.jsx - Main Application Component
import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import ProductCatalog from './components/ProductCatalog';
import ImportTasks from './components/ImportTasks';
import Settings from './components/Settings';
import VendorManagement from './components/VendorManagement';
import { BarChart3, Package, FileText, Users, Settings as SettingsIcon } from 'lucide-react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  // Global state
  const [customParams, setCustomParams] = useState({
    companyName: 'Your Company Name',
    currency: 'EUR',
    taxRate: 19,
    defaultSupplier: 'Maun',
    importPrefix: 'IMP',
    taskPrefix: 'TSK'
  });

  const [products, setProducts] = useState([
    { id: 1, productCode: 'TB-1001', name: 'Simit (cig simit)', coliTotal: 1, pcsTotal: 4800, pcsKrt: 100, supplier: 'Maun', supplierCode: '', selected: false },
    { id: 2, productCode: 'TB-1004', name: 'Acma Oliven (Zeytinli Acma Dökme)', coliTotal: 1, pcsTotal: 5120, pcsKrt: 80, supplier: 'Simit Sa...', supplierCode: '100006434', selected: false },
    { id: 3, productCode: 'TB-100', name: 'Croissant 90g', coliTotal: 1, pcsTotal: 6400, pcsKrt: 100, supplier: 'Simit Sa...', supplierCode: '100005720', selected: false },
    { id: 4, productCode: 'TB-1010', name: 'Sesamring/Simit gebacken (Simit tam pismiş)', coliTotal: 0.5, pcsTotal: 1200, pcsKrt: 50, supplier: 'Maun', supplierCode: '', selected: false },
    { id: 5, productCode: 'TB-1020', name: 'Acma Gebacken (Acma Tam Pismiş)', coliTotal: 1, pcsTotal: 1440, pcsKrt: 30, supplier: 'Maun', supplierCode: '', selected: false },
    { id: 6, productCode: 'TB-1021', name: 'Acma Oro gebacken (Yagli Acma tam pismiş)', coliTotal: 1, pcsTotal: 1728, pcsKrt: 36, supplier: 'Maun', supplierCode: '', selected: false },
    { id: 7, productCode: 'TB-1022', name: 'Acma Oliven (Zeytinli Acma Dökme)', coliTotal: 1, pcsTotal: 5120, pcsKrt: 80, supplier: 'Simit Sa...', supplierCode: '100006434', selected: false },
    { id: 8, productCode: 'TB-1030', name: 'Pogaca /Käsetasche gebacken (Pogaca tam pismiş)', coliTotal: 0.4, pcsTotal: 768, pcsKrt: 40, supplier: 'Maun', supplierCode: '', selected: false },
    { id: 9, productCode: 'TB-1031', name: 'Pogaca /Käsetasche gebacken (Pogaca pismiş Dökme)', coliTotal: 1, pcsTotal: 8000, pcsKrt: 125, supplier: 'Simit Sa...', supplierCode: '100010015', selected: false }
  ]);

  const [vendors, setVendors] = useState([
    { id: 1, name: 'Maun', contact: 'orders@maun.com', phone: '555-0101', rating: 4.5 },
    { id: 2, name: 'Simit Sarayi', contact: 'supply@simitsarayi.com', phone: '555-0102', rating: 4.2 }
  ]);

  const [imports, setImports] = useState([
    { 
      id: 1, 
      importNumber: 'IMP-2025-001', 
      date: '2025-06-20', 
      status: 'Open', 
      totalProducts: 5, 
      totalValue: 15680.50,
      supplier: 'Maun',
      type: 'Import',
      products: [
        { productCode: 'TB-1001', name: 'Simit (cig simit)', quantity: 10, unitPrice: 48.00 },
        { productCode: 'TB-1010', name: 'Sesamring/Simit gebacken', quantity: 25, unitPrice: 24.00 }
      ]
    }
  ]);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'imports', label: 'Imports/Tasks', icon: FileText },
    { id: 'vendors', label: 'Vendors', icon: Users },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];

  // Render login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLogin={setIsAuthenticated} />;
  }

  // Main application
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">{customParams.companyName} - Procurement</h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation */}
        <nav className="mb-6">
          <div className="flex space-x-4">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCurrentView(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Render current view */}
        {currentView === 'dashboard' && (
          <Dashboard 
            products={products}
            vendors={vendors}
            imports={imports}
            customParams={customParams}
          />
        )}

        {currentView === 'products' && (
          <ProductCatalog
            products={products}
            setProducts={setProducts}
            vendors={vendors}
            imports={imports}
            setImports={setImports}
            customParams={customParams}
          />
        )}

        {currentView === 'imports' && (
          <ImportTasks
            imports={imports}
            setImports={setImports}
            customParams={customParams}
          />
        )}

        {currentView === 'vendors' && (
          <VendorManagement
            vendors={vendors}
            setVendors={setVendors}
            products={products}
          />
        )}

        {currentView === 'settings' && (
          <Settings
            customParams={customParams}
            setCustomParams={setCustomParams}
          />
        )}
      </div>
    </div>
  );
};

// LoginScreen Component
const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'procurement2025') {
      onLogin(true);
    } else {
      alert('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Procurement System</h1>
          <p className="text-gray-600 mt-2">Secure Access Required</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Login
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Demo password: <code className="bg-gray-100 px-2 py-1 rounded">procurement2025</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ products, vendors, imports, customParams }) => {
  const totalProducts = products.length;
  const selectedCount = products.filter(p => p.selected).length;
  const openImports = imports.filter(imp => imp.status === 'Open').length;
  const totalImports = imports.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Products</h3>
              <p className="text-3xl font-bold text-blue-600">{totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Selected Items</h3>
              <p className="text-3xl font-bold text-green-600">{selectedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Open Imports</h3>
              <p className="text-3xl font-bold text-orange-600">{openImports}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Imports</h3>
              <p className="text-3xl font-bold text-purple-600">{totalImports}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Imports/Tasks</h3>
          <div className="space-y-3">
            {imports.slice(0, 5).map(imp => (
              <div key={imp.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{imp.importNumber}</p>
                  <p className="text-sm text-gray-600">{imp.supplier} • {imp.totalProducts} products</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{customParams.currency} {imp.totalValue?.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    imp.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    imp.status === 'Open' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {imp.status}
                  </span>
                </div>
              </div>
            ))}
            {imports.length === 0 && (
              <p className="text-gray-500 text-center py-8">No imports created yet</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Supplier Overview</h3>
          <div className="space-y-3">
            {vendors.map(vendor => {
              const vendorProducts = products.filter(p => p.supplier === vendor.name).length;
              return (
                <div key={vendor.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{vendor.name}</p>
                    <p className="text-sm text-gray-600">{vendor.contact}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{vendorProducts} products</p>
                    <p className="text-xs text-gray-600">{vendor.rating} ⭐</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ProductCatalog Component  
const ProductCatalog = ({ products, setProducts, vendors, imports, setImports, customParams }) => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productCode: '', name: '', coliTotal: '', pcsTotal: '', pcsKrt: '', supplier: '', supplierCode: ''
  });
  const [newImport, setNewImport] = useState({
    supplier: '', importType: 'Import', notes: ''
  });

  const selectedCount = products.filter(p => p.selected).length;

  const addProduct = () => {
    if (newProduct.productCode && newProduct.name) {
      setProducts([...products, { 
        ...newProduct, 
        id: Date.now(), 
        selected: false,
        coliTotal: parseFloat(newProduct.coliTotal) || 0,
        pcsTotal: parseInt(newProduct.pcsTotal) || 0,
        pcsKrt: parseInt(newProduct.pcsKrt) || 0
      }]);
      setNewProduct({ productCode: '', name: '', coliTotal: '', pcsTotal: '', pcsKrt: '', supplier: '', supplierCode: '' });
      setShowProductForm(false);
    }
  };

  const toggleProductSelection = (id) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, selected: !product.selected } : product
    ));
  };

  const selectAllProducts = () => {
    const allSelected = products.every(p => p.selected);
    setProducts(products.map(product => ({ ...product, selected: !allSelected })));
  };

  const createImportTask = () => {
    const selectedItems = products.filter(p => p.selected);
    if (selectedItems.length === 0) {
      alert('Please select at least one product');
      return;
    }

    const importNumber = newImport.importType === 'Import' 
      ? `${customParams.importPrefix}-${new Date().getFullYear()}-${String(imports.length + 1).padStart(3, '0')}`
      : `${customParams.taskPrefix}-${new Date().getFullYear()}-${String(imports.length + 1).padStart(3, '0')}`;

    const newImportTask = {
      id: Date.now(),
      importNumber,
      date: new Date().toISOString().split('T')[0],
      status: 'Open',
      totalProducts: selectedItems.length,
      totalValue: selectedItems.reduce((sum, item) => sum + (item.pcsTotal * 0.1), 0),
      supplier: newImport.supplier,
      type: newImport.importType,
      notes: newImport.notes,
      products: selectedItems.map(item => ({
        productCode: item.productCode,
        name: item.name,
        coliTotal: item.coliTotal,
        pcsTotal: item.pcsTotal,
        pcsKrt: item.pcsKrt,
        supplier: item.supplier,
        supplierCode: item.supplierCode
      }))
    };

    setImports([...imports, newImportTask]);
    setProducts(products.map(p => ({ ...p, selected: false })));
    setNewImport({ supplier: '', importType: 'Import', notes: '' });
    setShowImportForm(false);
    alert(`${newImport.importType} ${importNumber} created successfully!`);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Product Catalog</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowProductForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={18} />
              <span>Add Product</span>
            </button>
            <button
              onClick={() => setShowImportForm(true)}
              disabled={selectedCount === 0}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText size={18} />
              <span>Create Import ({selectedCount})</span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={selectAllProducts}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {products.every(p => p.selected) ? 'Deselect All' : 'Select All'}
          </button>
          <span className="text-sm text-gray-500">
            {selectedCount} of {products.length} selected
          </span>
        </div>
      </div>

      {showProductForm && (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Product Code (e.g., TB-1001)"
              value={newProduct.productCode}
              onChange={(e) => setNewProduct({...newProduct, productCode: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
            />
            <input
              type="number"
              step="0.1"
              placeholder="Coli Total"
              value={newProduct.coliTotal}
              onChange={(e) => setNewProduct({...newProduct, coliTotal: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="PCS/Total"
              value={newProduct.pcsTotal}
              onChange={(e) => setNewProduct({...newProduct, pcsTotal: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="PCS/KRT"
              value={newProduct.pcsKrt}
              onChange={(e) => setNewProduct({...newProduct, pcsKrt: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newProduct.supplier}
              onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Supplier</option>
              {vendors.map(vendor => (
                <option key={vendor.id} value={vendor.name}>{vendor.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Supplier Code"
              value={newProduct.supplierCode}
              onChange={(e) => setNewProduct({...newProduct, supplierCode: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={addProduct}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Save Product
            </button>
            <button
              onClick={() => setShowProductForm(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showImportForm && (
        <div className="p-6 border-b border-gray-200 bg-blue-50">
          <h3 className="text-lg font-semibold mb-4">Create Import/Task ({selectedCount} products selected)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={newImport.supplier}
              onChange={(e) => setNewImport({...newImport, supplier: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Supplier</option>
              {vendors.map(vendor => (
                <option key={vendor.id} value={vendor.name}>{vendor.name}</option>
              ))}
            </select>
            <select
              value={newImport.importType}
              onChange={(e) => setNewImport({...newImport, importType: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Import">Import</option>
              <option value="Task">Task</option>
            </select>
            <input
              type="text"
              placeholder="Notes (optional)"
              value={newImport.notes}
              onChange={(e) => setNewImport({...newImport, notes: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={createImportTask}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Create {newImport.importType}
            </button>
            <button
              onClick={() => setShowImportForm(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={products.every(p => p.selected)}
                  onChange={selectAllProducts}
                  className="rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold">Product Code</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Coli Total</th>
              <th className="px-6 py-3 text-left text-sm font-bold">PCS/Total</th>
              <th className="px-6 py-3 text-left text-sm font-bold">PCS/KRT</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Supplier</th>
              <th className="px-6 py-3 text-left text-sm font-bold">Supplier Code</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id} className={`hover:bg-gray-50 ${product.selected ? 'bg-blue-50' : ''}`}>
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={product.selected}
                    onChange={() => toggleProductSelection(product.id)}
                    className="rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.productCode}</td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.coliTotal}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.pcsTotal}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.pcsKrt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.supplier === 'Maun' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.supplier}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.supplierCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Import dummy components for other views
const ImportTasks = ({ imports, setImports, customParams }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-bold mb-4">Imports & Tasks</h2>
    <p className="text-gray-600">Import/Tasks management coming soon...</p>
  </div>
);

const VendorManagement = ({ vendors, setVendors, products }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-bold mb-4">Vendor Management</h2>
    <p className="text-gray-600">Vendor management coming soon...</p>
  </div>
);

const Settings = ({ customParams, setCustomParams }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-bold mb-4">Settings</h2>
    <p className="text-gray-600">Settings management coming soon...</p>
  </div>
);

export default App;
