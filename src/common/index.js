const backendDomain = import.meta.env.VITE_API_URL;
console.log(backendDomain)
const SummaryApi = {
    signUP: {
        url: `${backendDomain}/api/auth/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/auth/login`,
        method: "post"
    },
    createMember: {
        url: `${backendDomain}/api/auth/create-member`,
        method: "post"
    },
    getTeamMembers: {
        url: `${backendDomain}/api/auth/team-members`,
        method: "get"
    },
    createTask: {
        url: `${backendDomain}/api/tasks/`,
        method: "post"
    },
    getTasks: {
        url: `${backendDomain}/api/tasks/`,
        method: "get"
    },
    updateTaskStatus: {
        url: (taskId) => `${backendDomain}/api/tasks/${taskId}`,
        method: "put"
    }
};

export default SummaryApi;
