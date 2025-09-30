import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from './config';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userRole, setUserRole] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', position: '', salary: '' });
  const [authForm, setAuthForm] = useState({ username: '', password: '' });

  // new states for search, filter, pagination
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => { if (token) fetchEmployees(); }, [token]);

  async function login(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, authForm);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      setUserRole(payload.role);
    } catch (err) { alert(err.response?.data?.message || err.message); }
  }

  async function fetchEmployees() {
    try {
      const res = await axios.get(`${API_BASE}/employees`, { headers: { Authorization: 'Bearer ' + token } });
      setEmployees(res.data);
    } catch (err) { console.error(err); }
  }

  async function createEmployee(e) {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/employees`, form, { headers: { Authorization: 'Bearer ' + token } });
      setForm({ name: '', email: '', position: '', salary: '' });
      fetchEmployees();
    } catch (err) { alert(err.response?.data?.message || err.message); }
  }

  async function deleteEmployee(id) {
    if (!confirm('Delete?')) return;
    try {
      await axios.delete(`${API_BASE}/employees/` + id, { headers: { Authorization: 'Bearer ' + token } });
      fetchEmployees();
    } catch (err) { alert(err.response?.data?.message || err.message); }
  }

  // 🔹 search + filter + pagination logic
  const filteredEmployees = employees
    .filter(emp => emp.name.toLowerCase().includes(search.toLowerCase()))
    .filter(emp => (filterRole ? emp.position === filterRole : true));

  const employeesPerPage = 5;
  const indexOfLast = currentPage * employeesPerPage;
  const indexOfFirst = indexOfLast - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      {/* login form */}
      {!token && <form onSubmit={login} className="card">
        <h3>Login</h3>
        <input placeholder="username" value={authForm.username} onChange={e => setAuthForm({ ...authForm, username: e.target.value })} />
        <input placeholder="password" type="password" value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} />
        <button>Login</button>
      </form>}

      {/* after login */}
      {token && <div>
        <div className="top">
          <button onClick={() => { localStorage.removeItem('token'); setToken(''); setUserRole(null); }}>Logout</button>
        </div>

        <div className="card">
          <h3>Employees</h3>

          {/* Search + Filter */}
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />

          <select
            value={filterRole}
            onChange={(e) => { setFilterRole(e.target.value); setCurrentPage(1); }}
          >
            <option value="">All Roles</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="HR">HR</option>
          </select>

          {/* Employees table */}
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Position</th><th>Salary</th><th>Actions</th></tr></thead>
            <tbody>
              {currentEmployees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.position}</td>
                  <td>{emp.salary}</td>
                  <td>
                    {userRole === 'admin' && <>
                      <button onClick={() => {
                        const name = prompt('Name', emp.name);
                        if (!name) return;
                        axios.put(API_BASE + '/employees/' + emp.id, { ...emp, name }, { headers: { Authorization: 'Bearer ' + token } }).then(fetchEmployees);
                      }}>Edit</button>
                      <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
                    </>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ marginTop: "10px" }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  margin: "2px",
                  padding: "6px 10px",
                  background: currentPage === i + 1 ? "#007bff" : "#eee",
                  color: currentPage === i + 1 ? "#fff" : "#000",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* create employee */}
        {userRole === 'admin' && <form onSubmit={createEmployee} className="card">
          <h3>Create Employee</h3>
          <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Position" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} />
          <input placeholder="Salary" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} />
          <button>Create</button>
        </form>}
      </div>}
    </div>
  );
}

export default App;
