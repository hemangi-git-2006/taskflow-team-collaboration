import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import API from "../services/api";

import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import EmployeeHeader from "../components/employee/EmployeeHeader";
import EmployeeStats from "../components/employee/EmployeeStats";
import EmployeeProjectSelector from "../components/employee/EmployeeProjectSelector";
import EmployeeTaskList from "../components/employee/EmployeeTaskList";
import EmployeeTeam from "../components/employee/EmployeeTeam";
import EmployeeProfile from "../components/employee/EmployeeProfile";
import EmployeeActivity from "../components/employee/EmployeeActivity";

function EmployeeDashboard() {

  const user =
    JSON.parse(localStorage.getItem("user"));
    console.log("CURRENT USER:", user);
console.log("CURRENT USER ID:", user?._id);

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);

  const [selectedProject, setSelectedProject] =
    useState("");

  const [activeSection, setActiveSection] =
    useState("dashboard");

  // ============================
  // Section References
  // ============================

  const dashboardRef = useRef(null);
  const projectsRef = useRef(null);
  const tasksRef = useRef(null);
  const teamRef = useRef(null);
  const profileRef = useRef(null);

  // ============================
  // Fetch Dashboard
  // ============================

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await API.get(
        `/tasks/member/${user._id}`
      );

      setTasks(res.data);

      // Create unique project list

      const uniqueProjects = [];

      res.data.forEach((task) => {

        if (
          task.project &&
          !uniqueProjects.find(
            (project) =>
              project._id === task.project._id
          )
        ) {

          uniqueProjects.push(task.project);

        }

      });

      setProjects(uniqueProjects);

    } catch (error) {

      console.log(error);

    }
  };

  // ============================
  // Get Team Members
  // ============================

  useEffect(() => {
  getMembers();
}, []);

const getMembers = async () => {
  try {
    const res = await API.get(
      `/members/user/${user._id}`
    );

    console.log("TEAM MEMBERS FROM API:", res.data);

    setMembers(res.data);

  } catch (error) {
    console.log("GET MEMBERS ERROR:", error);
  }
};
  // ============================
  // Filter Tasks By Project
  // ============================

  const filteredTasks = useMemo(() => {

    if (!selectedProject) {
      return tasks;
    }

    return tasks.filter(
      (task) =>
        task.project?._id === selectedProject
    );

  }, [tasks, selectedProject]);

  // ============================
  // Statistics
  // ============================

  const completedTasks =
    filteredTasks.filter(
      (task) =>
        task.status === "Completed"
    ).length;

  const pendingTasks =
    filteredTasks.filter(
      (task) =>
        task.status !== "Completed"
    ).length;

  // ============================
  // Scroll To Section
  // ============================

  const scrollToSection = (section) => {

    const refs = {
      dashboard: dashboardRef,
      projects: projectsRef,
      tasks: tasksRef,
      team: teamRef,
      profile: profileRef,
    };

    const selectedRef = refs[section];

    if (selectedRef?.current) {

      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setActiveSection(section);
    }
  };

  // ============================
  // Detect Section While Scrolling
  // ============================

  useEffect(() => {

    const sections = [
      {
        name: "dashboard",
        ref: dashboardRef,
      },
      {
        name: "projects",
        ref: projectsRef,
      },
      {
        name: "tasks",
        ref: tasksRef,
      },
      {
        name: "team",
        ref: teamRef,
      },
      {
        name: "profile",
        ref: profileRef,
      },
    ];

    const handleScroll = () => {

      const scrollPosition =
        window.scrollY + 200;

      let currentSection =
        "dashboard";

      sections.forEach((section) => {

        if (
          section.ref.current &&
          section.ref.current.offsetTop <=
            scrollPosition
        ) {

          currentSection =
            section.name;

        }

      });

      setActiveSection(currentSection);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };

  }, []);

  return (

    <div className="min-h-screen bg-slate-100">

      {/* ============================
          Sidebar
      ============================ */}

      <EmployeeSidebar
        scrollToSection={scrollToSection}
        activeSection={activeSection}
      />

      {/* ============================
          Main Content
      ============================ */}

      <main
        className="
          lg:ml-64
          pt-16
          lg:pt-0
        "
      >

        <div className="p-4 sm:p-6 lg:p-8 space-y-8">

          {/* ============================
              Dashboard Section
          ============================ */}

          <section
            ref={dashboardRef}
            className="scroll-mt-20"
          >

            <EmployeeHeader />

            <div className="mt-8">

              <EmployeeStats
                totalTasks={
                  filteredTasks.length
                }
                completedTasks={
                  completedTasks
                }
                pendingTasks={
                  pendingTasks
                }
                totalProjects={
                  projects.length
                }
              />

            </div>

          </section>

          {/* ============================
              Projects Section
          ============================ */}

          <section
            ref={projectsRef}
            className="scroll-mt-20"
          >

            <EmployeeProjectSelector
              projects={projects}
              selectedProject={
                selectedProject
              }
              setSelectedProject={
                setSelectedProject
              }
            />

          </section>

         

          {/* ============================
              Team Section
          ============================ */}

          <section
            ref={teamRef}
            className="scroll-mt-20"
          >

            <EmployeeTeam
              members={members}
            />

          </section>

          {/* ============================
              Activity
          ============================ */}

          <section>

            <EmployeeActivity
              tasks={filteredTasks}
            />

          </section>

          {/* ============================
              Profile Section
          ============================ */}

          <section
            ref={profileRef}
            className="scroll-mt-20"
          >

            <EmployeeProfile
              user={user}
              totalProjects={
                projects.length
              }
            />

          </section>

        </div>

      </main>

    </div>
  );
}

export default EmployeeDashboard;