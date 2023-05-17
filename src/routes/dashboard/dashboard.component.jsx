import Tables from "../../components/tables/tables.component";

import "./dashboard.styles.scss";

const Dashboard = ({ user }) => {
  return (
    user.id && (
      <div className="dashboard">
        <aside className="aside-menu">
          <h1>aside</h1>
        </aside>
        <main className="main-dashboard">
          <Tables />
        </main>
      </div>
    )
  );
};

export default Dashboard;
