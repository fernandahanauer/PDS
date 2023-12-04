
import { deleteOptions, postOptions, request } from "./helper";
import { API_URL } from "./options"



export const getResourceList = async () => {
    const result = await request(fetch(`${API_URL}/api/resource/list`));

    return result;
}

export const getResource = async (resourceId: string) => {
    const result = await request(fetch(`${API_URL}/api/resource/get/${resourceId}`));

    return result;
}

export const updateResourceInfo = async (resourceId: string, form: any) => {
    const result = await request(fetch(`${API_URL}/api/resource/update/${resourceId}/info`, postOptions(form)));

    return result;
}

export const getSkillsList = async () => {
    const result = await request(fetch(`${API_URL}/api/skill/list`));

    return result;
}

export const getProjectList = async () => {
    const result = await request(fetch(`${API_URL}/api/project/list`));

    return result;
}


export const getPositionsList = async () => {
    const result = await request(fetch(`${API_URL}/api/positions/list`));

    return result;
}

export const updateResourceAddProject = async (resourceId: string, form: any) => {
    const result = await request(fetch(`${API_URL}/api/resource/project/add/${resourceId}`, postOptions(form)));

    return result;
}

export const updateResourceComment = async (resourceId: string, comment: any) => {
    const result = await request(fetch(`${API_URL}/api/resource/update/${resourceId}/comment`, postOptions({ comment })));

    return result;
}

export const updateAddVacation = async (resourceId: string, form: any) => {
    const result = await request(fetch(`${API_URL}/api/resource/update/${resourceId}/vacation`, postOptions(form)));

    return result;
}


export const removeVacation = async (resourceId: string, vacationIndex: number) => {
    const result = await request(fetch(`${API_URL}/api/resource/delete/${resourceId}/vacation/${vacationIndex}`, deleteOptions()));

    return result;
}


export const removeProject = async (resourceId: string, projectHistoryIndex: number) => {
    const result = await request(fetch(`${API_URL}/api/resource/delete/${resourceId}/project/${projectHistoryIndex}`, deleteOptions()));

    return result;
}


export const setCurrentProject = async (resourceId: string, projectId: string) => {
    const result = await request(fetch(`${API_URL}/api/resource/project/update/${resourceId}/setCurrent/${projectId}`, postOptions()));

    return result;
}


export const AddResourceToPosition = async (positionId: string, resourcesId: string[]) => {
    const result = await request(fetch(`${API_URL}/api/resource/position/addfullfillment/${positionId}`, postOptions(resourcesId)));

    return result;
}

export const PositionToBeHired = async (positionId: string, toBeHired: boolean) => {
    const result = await request(fetch(`${API_URL}/api/resource/position/tobehired/${positionId}`, postOptions({ toBeHired })));

    return result;
}

