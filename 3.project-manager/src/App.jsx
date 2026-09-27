import Sidebar from "./components/Sidebar.jsx";
import MainProject from "./components/MainProject.jsx";
import { useState } from "react";

function App() {


  const [projects, setProjects] = useState([]);
  const [mainContentState, setMainContentState] = useState("noProject"); // noProject , createProject , editProject
  const [projectId, setProjectId] = useState(null)

  function editProject (projectId){
    setMainContentState("editProject");
    setProjectId(projectId);
  }
  

  return (
    <main className="flex h-screen bg-zinc-200">
      <Sidebar
        projects={projects}
        editProject={editProject}
        setCreateProject={() => setMainContentState("createProject")} />

      <MainProject
        projects={projects}
        projectId={projectId}
        setProjects={setProjects}
        setProjectId={setProjectId}
        mainContentState={mainContentState}
        setMainContentState={setMainContentState} />
    </main>

  );
}

export default App;
