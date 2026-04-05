import { useState, useMemo } from "react";
import "./Admin.css";

// TODO: This is a demo password. In production we need to handle auth properly
const DEMO_PASSWORD = "admin123";

// TODO: This is a mock database schema, we need to replace with actual API calls when backend is ready
const MOCK_TABLES = {
  water_reports: {
    columns: ["id", "reporter_name", "email", "location", "pollution_type", "severity", "description", "photo_url", "status", "created_at"],
    data: [
      { id: 1, reporter_name: "John Smith", email: "john@example.com", location: "123 Main St", pollution_type: "contamination", severity: "high", description: "Brown water from tap", photo_url: null, status: "pending", created_at: "2024-01-15 10:30:00" },
      { id: 2, reporter_name: "Jane Doe", email: "jane@example.com", location: "456 Oak Ave", pollution_type: "broken-pump", severity: "critical", description: "Pump not working for 3 days", photo_url: "/uploads/pump.jpg", status: "in_progress", created_at: "2024-01-14 08:15:00" },
      { id: 3, reporter_name: "Bob Wilson", email: "bob@example.com", location: "789 Pine Rd", pollution_type: "leak", severity: "medium", description: "Water leaking from pipe", photo_url: null, status: "resolved", created_at: "2024-01-13 14:45:00" },
    ]
  },
  inquiries: {
    columns: ["id", "name", "email", "subject", "message", "status", "created_at"],
    data: [
      { id: 1, name: "Alice Brown", email: "alice@example.com", subject: "Service hours", message: "What are your operating hours?", status: "replied", created_at: "2024-01-15 09:00:00" },
      { id: 2, name: "Charlie Green", email: "charlie@example.com", subject: "Coverage area", message: "Do you cover the downtown area?", status: "pending", created_at: "2024-01-14 16:30:00" },
    ]
  },
  users: {
    columns: ["id", "username", "email", "role", "created_at"],
    data: [
      { id: 1, username: "admin", email: "admin@watersupply.com", role: "admin", created_at: "2024-01-01 00:00:00" },
      { id: 2, username: "operator1", email: "op1@watersupply.com", role: "operator", created_at: "2024-01-05 10:00:00" },
    ]
  }
};

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("tables");

  // Tables state
  const [selectedTable, setSelectedTable] = useState("water_reports");

  // Query state
  const [queryTable, setQueryTable] = useState("water_reports");
  const [queryColumns, setQueryColumns] = useState("*");
  const [queryWhere, setQueryWhere] = useState("");
  const [queryResults, setQueryResults] = useState(null);
  const [queryError, setQueryError] = useState("");

  // Edit state
  const [editTable, setEditTable] = useState("water_reports");
  const [editRecordId, setEditRecordId] = useState("");
  const [editData, setEditData] = useState(null);
  const [editSuccess, setEditSuccess] = useState("");

  // Delete state
  const [deleteTable, setDeleteTable] = useState("water_reports");
  const [deleteRecordId, setDeleteRecordId] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState("");

  // Local mock data state (for demo updates/deletes)
  const [mockData, setMockData] = useState(MOCK_TABLES);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === DEMO_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  // Calculate statistics
  const statistics = useMemo(() => {
    const stats = {};
    Object.keys(mockData).forEach(table => {
      stats[table] = {
        recordCount: mockData[table].data.length,
        columnCount: mockData[table].columns.length,
      };
    });
    return stats;
  }, [mockData]);

  const totalRecords = useMemo(() => {
    return Object.values(statistics).reduce((sum, s) => sum + s.recordCount, 0);
  }, [statistics]);

  // Execute query (simulated)
  const executeQuery = (e) => {
    e.preventDefault();
    setQueryError("");
    setQueryResults(null);

    try {
      const table = mockData[queryTable];
      if (!table) {
        setQueryError("Table not found");
        return;
      }

      let results = [...table.data];

      // Apply WHERE filter (simple implementation)
      if (queryWhere.trim()) {
        const match = queryWhere.match(/(\w+)\s*=\s*['"]?([^'"]+)['"]?/i);
        if (match) {
          const [, column, value] = match;
          results = results.filter(row =>
            String(row[column]).toLowerCase() === value.toLowerCase()
          );
        }
      }

      // Apply column selection
      if (queryColumns.trim() !== "*") {
        const cols = queryColumns.split(",").map(c => c.trim());
        results = results.map(row => {
          const filtered = {};
          cols.forEach(col => {
            if (Object.hasOwn(row, col)) {
              filtered[col] = row[col];
            }
          });
          return filtered;
        });
      }

      setQueryResults({
        columns: queryColumns === "*" ? table.columns : queryColumns.split(",").map(c => c.trim()),
        data: results,
        rowCount: results.length
      });
    } catch {
      setQueryError("Error executing query");
    }
  };

  // Load record for editing
  const loadRecordForEdit = () => {
    const table = mockData[editTable];
    if (!table) return;

    const record = table.data.find(r => String(r.id) === editRecordId);
    if (record) {
      setEditData({ ...record });
      setEditSuccess("");
    } else {
      setEditData(null);
      setEditSuccess("Record not found");
    }
  };

  // Save edited record
  const saveRecord = (e) => {
    e.preventDefault();
    if (!editData) return;

    setMockData(prev => {
      const updated = { ...prev };
      const tableData = [...updated[editTable].data];
      const index = tableData.findIndex(r => r.id === editData.id);
      if (index !== -1) {
        tableData[index] = { ...editData };
        updated[editTable] = { ...updated[editTable], data: tableData };
      }
      return updated;
    });
    setEditSuccess("Record updated successfully");
    setEditData(null);
    setEditRecordId("");
  };

  // Delete record
  const confirmDelete = () => {
    setMockData(prev => {
      const updated = { ...prev };
      const tableData = updated[deleteTable].data.filter(
        r => String(r.id) !== deleteRecordId
      );
      updated[deleteTable] = { ...updated[deleteTable], data: tableData };
      return updated;
    });
    setDeleteSuccess(`Record ${deleteRecordId} deleted successfully`);
    setDeleteConfirm(false);
    setDeleteRecordId("");
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!queryResults || !queryResults.data.length) return;

    const headers = queryResults.columns.join(",");
    const rows = queryResults.data.map(row =>
      queryResults.columns.map(col => {
        const val = row[col];
        if (val === null || val === undefined) return "";
        const str = String(val);
        return str.includes(",") || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str;
      }).join(",")
    );

    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${queryTable}_export_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          <div className="admin-login-icon">🔐</div>
          <h1>Admin Access</h1>
          <p>Enter password to access database management</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
            />
            {loginError && <div className="login-error">{loginError}</div>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Database Administration</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      <nav className="admin-nav">
        <button
          className={activeTab === "tables" ? "active" : ""}
          onClick={() => setActiveTab("tables")}
        >
          Tables
        </button>
        <button
          className={activeTab === "query" ? "active" : ""}
          onClick={() => setActiveTab("query")}
        >
          Query
        </button>
        <button
          className={activeTab === "update" ? "active" : ""}
          onClick={() => setActiveTab("update")}
        >
          Update
        </button>
        <button
          className={activeTab === "delete" ? "active" : ""}
          onClick={() => setActiveTab("delete")}
        >
          Delete
        </button>
        <button
          className={activeTab === "stats" ? "active" : ""}
          onClick={() => setActiveTab("stats")}
        >
          Statistics
        </button>
      </nav>

      <main className="admin-content">
        {/* Tables View */}
        {activeTab === "tables" && (
          <section className="admin-section">
            <h2>Database Tables</h2>
            <div className="table-selector">
              <label>Select Table:</label>
              <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
                {Object.keys(mockData).map(table => (
                  <option key={table} value={table}>{table}</option>
                ))}
              </select>
            </div>
            <div className="table-info">
              <p><strong>Columns:</strong> {mockData[selectedTable].columns.join(", ")}</p>
              <p><strong>Record Count:</strong> {mockData[selectedTable].data.length}</p>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    {mockData[selectedTable].columns.map(col => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockData[selectedTable].data.map((row, i) => (
                    <tr key={i}>
                      {mockData[selectedTable].columns.map(col => (
                        <td key={col}>{row[col] === null ? <em>null</em> : String(row[col])}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Query Interface */}
        {activeTab === "query" && (
          <section className="admin-section">
            <h2>Execute SELECT Query</h2>
            <form className="query-form" onSubmit={executeQuery}>
              <div className="query-builder">
                <div className="query-row">
                  <label>SELECT</label>
                  <input
                    type="text"
                    value={queryColumns}
                    onChange={(e) => setQueryColumns(e.target.value)}
                    placeholder="* or column1, column2"
                  />
                </div>
                <div className="query-row">
                  <label>FROM</label>
                  <select value={queryTable} onChange={(e) => setQueryTable(e.target.value)}>
                    {Object.keys(mockData).map(table => (
                      <option key={table} value={table}>{table}</option>
                    ))}
                  </select>
                </div>
                <div className="query-row">
                  <label>WHERE</label>
                  <input
                    type="text"
                    value={queryWhere}
                    onChange={(e) => setQueryWhere(e.target.value)}
                    placeholder="column = 'value' (optional)"
                  />
                </div>
              </div>
              <div className="query-preview">
                <code>SELECT {queryColumns} FROM {queryTable}{queryWhere ? ` WHERE ${queryWhere}` : ""}</code>
              </div>
              <button type="submit">Execute Query</button>
            </form>

            {queryError && <div className="query-error">{queryError}</div>}

            {queryResults && (
              <div className="query-results">
                <div className="results-header">
                  <h3>Results ({queryResults.rowCount} rows)</h3>
                  <button onClick={exportToCSV} className="export-button">Export CSV</button>
                </div>
                {queryResults.data.length > 0 ? (
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          {queryResults.columns.map(col => (
                            <th key={col}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {queryResults.data.map((row, i) => (
                          <tr key={i}>
                            {queryResults.columns.map(col => (
                              <td key={col}>{row[col] === null ? <em>null</em> : String(row[col])}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="no-results">No records found</p>
                )}
              </div>
            )}
          </section>
        )}

        {/* Update Interface */}
        {activeTab === "update" && (
          <section className="admin-section">
            <h2>Update Record</h2>
            <div className="update-selector">
              <div className="selector-row">
                <label>Table:</label>
                <select value={editTable} onChange={(e) => { setEditTable(e.target.value); setEditData(null); }}>
                  {Object.keys(mockData).map(table => (
                    <option key={table} value={table}>{table}</option>
                  ))}
                </select>
              </div>
              <div className="selector-row">
                <label>Record ID:</label>
                <input
                  type="text"
                  value={editRecordId}
                  onChange={(e) => setEditRecordId(e.target.value)}
                  placeholder="Enter record ID"
                />
                <button onClick={loadRecordForEdit}>Load</button>
              </div>
            </div>

            {editSuccess && <div className="success-message">{editSuccess}</div>}

            {editData && (
              <form className="edit-form" onSubmit={saveRecord}>
                <h3>Editing Record #{editData.id}</h3>
                {mockData[editTable].columns.filter(col => col !== "id").map(col => (
                  <div key={col} className="edit-field">
                    <label>{col}:</label>
                    <input
                      type="text"
                      value={editData[col] ?? ""}
                      onChange={(e) => setEditData(prev => ({ ...prev, [col]: e.target.value }))}
                    />
                  </div>
                ))}
                <div className="edit-actions">
                  <button type="submit" className="save-button">Save Changes</button>
                  <button type="button" onClick={() => setEditData(null)}>Cancel</button>
                </div>
              </form>
            )}
          </section>
        )}

        {/* Delete Interface */}
        {activeTab === "delete" && (
          <section className="admin-section">
            <h2>Delete Record</h2>
            <div className="delete-form">
              <div className="selector-row">
                <label>Table:</label>
                <select value={deleteTable} onChange={(e) => setDeleteTable(e.target.value)}>
                  {Object.keys(mockData).map(table => (
                    <option key={table} value={table}>{table}</option>
                  ))}
                </select>
              </div>
              <div className="selector-row">
                <label>Record ID:</label>
                <input
                  type="text"
                  value={deleteRecordId}
                  onChange={(e) => setDeleteRecordId(e.target.value)}
                  placeholder="Enter record ID to delete"
                />
              </div>
              <button
                className="delete-button"
                onClick={() => setDeleteConfirm(true)}
                disabled={!deleteRecordId}
              >
                Delete Record
              </button>
            </div>

            {deleteSuccess && <div className="success-message">{deleteSuccess}</div>}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
              <div className="modal-overlay" onClick={() => setDeleteConfirm(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-icon warning">⚠️</div>
                  <h3>Confirm Deletion</h3>
                  <p>Are you sure you want to delete record <strong>#{deleteRecordId}</strong> from <strong>{deleteTable}</strong>?</p>
                  <p className="warning-text">This action cannot be undone.</p>
                  <div className="modal-actions">
                    <button className="cancel-button" onClick={() => setDeleteConfirm(false)}>Cancel</button>
                    <button className="confirm-delete-button" onClick={confirmDelete}>Delete</button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Statistics View */}
        {activeTab === "stats" && (
          <section className="admin-section">
            <h2>Database Statistics</h2>
            <div className="stats-overview">
              <div className="stat-card total">
                <h3>Total Records</h3>
                <span className="stat-number">{totalRecords}</span>
              </div>
              <div className="stat-card">
                <h3>Total Tables</h3>
                <span className="stat-number">{Object.keys(mockData).length}</span>
              </div>
            </div>
            <div className="stats-table">
              <h3>Table Details</h3>
              <table>
                <thead>
                  <tr>
                    <th>Table Name</th>
                    <th>Columns</th>
                    <th>Records</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(statistics).map(([table, stats]) => (
                    <tr key={table}>
                      <td>{table}</td>
                      <td>{stats.columnCount}</td>
                      <td>{stats.recordCount}</td>
                      <td><span className="status-badge healthy">Healthy</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Admin;
