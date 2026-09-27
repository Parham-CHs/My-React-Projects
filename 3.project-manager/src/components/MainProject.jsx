import NewProject from "./mainProjectComps/NewProject.jsx";
import EmptyProject from "./mainProjectComps/EmptyProject.jsx"
import EditProject from "./mainProjectComps/EditProject.jsx"


export default function MainProject({ setMainContentState, mainContentState, setProjects, projects, projectId, setProjectId }) {

    function deleteProject() {
        setProjects(prevProjects =>
            prevProjects.filter(project => project.id !== projectId)
        );

        setMainContentState("noProject");
        setProjectId(null);
    }


    let mainContent;

    if (mainContentState === "createProject")
        mainContent = <NewProject setProjects={setProjects} setNoProject={() => setMainContentState("noProject")} />

    else if (mainContentState === "editProject")
        mainContent = <EditProject projects={projects} projectId={projectId} setProjects={setProjects} deleteProject={deleteProject} />

    else // noProject
        mainContent = <EmptyProject setCreateProject={() => setMainContentState("createProject")} />

    return (mainContent);
}
