import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <h2>Navbar</h2>

      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "220px",
            borderRight: "1px solid #ccc",
            padding: "20px",
          }}
        >
          Sidebar
        </div>

        <div style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainLayout;