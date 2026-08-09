import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

import AddMemberModal from "../components/members/AddMemberModal";
import CreateTaskModal from "../components/tasks/CreateTaskModal";
import ProjectHeader from "../components/projectDetails/ProjectHeader";
import ProjectTabs from "../components/projectDetails/ProjectTabs";
import OverviewTab from "../components/projectDetails/OverviewTab";
import MembersTab from "../components/projectDetails/MembersTab";
import TasksTab from "../components/projectDetails/TasksTab";
import ActivityTab from "../components/projectDetails/ActivityTab";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);

  useEffect(() => {
    getProject();
    getMembers();
    getTasks();
  }, []);

  const getProject = async () => {
    try {
      console.log("Fetching project...");

      const res = await API.get(`/projects/${id}`);

      console.log("Project Response:", res.data);

      setProject(res.data);
    } catch (error) {
      console.log("Project Error:", error);
    }
  };

  const getMembers = async () => {
    try {
      const res = await API.get(`/members/${id}`);
      setMembers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    try {
      console.log("Fetching tasks...");

      const res = await API.get(`/tasks/project/${id}`);

      console.log("Tasks Response:", res.data);

      setTasks(res.data);
    } catch (error) {
      console.log("Tasks Error:", error);
    }
  };

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl sm:text-2xl font-bold">
          Loading...
        </h2>
      </div>
    );
  }

  console.log("ProjectDetails tasks:", tasks);
  console.log("Active Tab:", activeTab);

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <ProjectHeader
        project={project}
        members={members}
        tasks={tasks}
      />

      {/* Tabs + Content */}
      <div className="bg-white rounded-2xl lg:rounded-3xl shadow-lg mt-6 lg:mt-8">

        <ProjectTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="p-4 sm:p-6 lg:p-8">

          {/* Overview */}
          {activeTab === "overview" && (
            <OverviewTab
              project={project}
              members={members}
              tasks={tasks}
            />
          )}

          {/* Members */}
          {activeTab === "members" && (
            <MembersTab
              members={members}
              setOpenMemberModal={setOpenMemberModal}
              refreshMembers={getMembers}
            />
          )}

          {/* Tasks */}
          {activeTab === "tasks" && (
            <TasksTab
              tasks={tasks}
              setOpenTaskModal={setOpenTaskModal}
              refreshTasks={getTasks}
            />
          )}

          {/* Activity */}
          {activeTab === "activity" && (
            <ActivityTab
              project={project}
              members={members}
              tasks={tasks}
            />
          )}

        </div>

      </div>

      {/* Add Member Modal */}
      {openMemberModal && (
        <AddMemberModal
          projectId={id}
          refreshMembers={getMembers}
          closeModal={() => setOpenMemberModal(false)}
        />
      )}

      {/* Create Task Modal */}
      {openTaskModal && (
        <CreateTaskModal
          projectId={id}
          closeModal={() => setOpenTaskModal(false)}
          refreshProject={getTasks}
        />
      )}

    </div>
  );
}

export default ProjectDetails;