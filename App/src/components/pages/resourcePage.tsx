import { useParams } from "react-router-dom";
import { EnglishLevelEnum, GenderEnum, Project, Resource, ResourceProject, ResourceStatusEnum, ResourceType, SeniorityEnum, Supervisor } from "../../types";
import { getResource } from "../api/resources";
import { ResourceData } from "../modules/resource-data";
import { Card } from "../shared/card";
import { useEffect, useState } from "react";


const ResourcePage = () => {
    const { id } = useParams();
    const [resource, setResource] = useState<Resource>();

    const getData = async () => {
        if (id)
            setResource(await getResource(id));
    }
    useEffect(() => {
        getData();
    }, [id])


    return (
        <div className="container">
            <Card>
                {resource && (
                    <ResourceData resource={resource} refetch={getData} />
                )}
            </Card>
        </div>
    )
}

export { ResourcePage };