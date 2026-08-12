import { useEffect, useState } from "react";

import API from "../services/api";

import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import EmployeeTeam from "../components/employee/EmployeeTeam";

function EmployeeTeamPage() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [members, setMembers] = useState([]);

  // ============================
  // Get Team Members
  // ============================

  const getMembers = async () => {

    try {

      const res = await API.get(
        `/members/user/${user._id}`
      );

      console.log(
        "TEAM MEMBERS FROM API:",
        res.data
      );

      setMembers(res.data);

    } catch (error) {

      console.log(
        "GET MEMBERS ERROR:",
        error
      );

    }

  };

  useEffect(() => {

    getMembers();

  }, []);

  return (

    <div className="min-h-screen bg-slate-100">

      {/* Sidebar */}

      <EmployeeSidebar />

      {/* Main Content */}

      <main
        className="
          lg:ml-64
          min-h-screen
          pt-16
          lg:pt-0
        "
      >

        <div
          className="
            p-4
            sm:p-6
            lg:p-8
          "
        >

          <EmployeeTeam
            members={members}
          />

        </div>

      </main>

    </div>

  );

}

export default EmployeeTeamPage;