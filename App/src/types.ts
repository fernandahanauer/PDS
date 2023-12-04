
export interface Skill {
    id: string;
    name: string;
}

export interface Vacation {
    begin: Date;
    end: Date;
}

export interface ResourceType {
    status: ResourceStatusEnum;
    potentialDate?: Date;
}

export interface Project {
    id: string;
    name: string;
}

export interface ResourceProject {
    project: Project;
    beginDate: Date;
    endDate?: Date;
}

export enum EnglishLevelEnum {
    Basic,
    Intermidiate,
    Advacend
}

export interface Supervisor {
    id: string;
    name: string;
    lastName: string;
}


export interface Address {
    country: string;
    state: string;
    city: string;
}


export interface Resource {
    id: string;
    name: string,
    lastName: string,
    birthday?: Date,
    skills: {
        main: Skill,
        second?: Skill,
        others?: Skill[]
    },
    seniority: SeniorityEnum,
    techLead: boolean;
    profileComments: string,
    vacation?: Vacation,
    vacationAvailableDays?: number;
    vacationHistory?: Vacation[],
    status: ResourceType,
    project?: ResourceProject,
    projectHistory?: ResourceProject[],
    englishLevel: EnglishLevelEnum,
    salary: number,
    supervisor: Supervisor,
    PWD: boolean,
    linkedin?: string,
    address?: Address,
    gender: GenderEnum,
    hiringDate: Date
}

export enum ResourceStatusEnum {
    none,
    NonBilled,
    ResourceReductionPlanned,
    ResourceTransictionPlanned
}

export enum SeniorityEnum {
    JuniorBeginner,
    JuniorMid,
    JuniorTop,
    MidBeginner,
    MidMid,
    MidTop,
    Senior,
    SeniorTop,
    Intern,
    none,
}


export enum GenderEnum {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}


export enum FullFilmentStatusEnum {
    none,
    UnderEvaluation,
    Selected,
    PreSelect,
    Discarded
}

export enum VagaStatusEnum {
    Open,
    Planned,
    Closed,
    Canceled
}

export interface Position {
    id: string;
    title: string;
    description?: string;
    projectId: string;
    seniority?: SeniorityEnum;
    skills: Skill[];
    status: VagaStatusEnum;
    salary?: string;
    startDate?: Date;
    fullfilments: string[];
}



export interface FullFilmentsDTO {
    name: string;
}

export interface ResourceListDTO {
    id: any;
    fullName: string;
    projectName: string;
    fullfilments: string[];
    dateAvailable: Date;
    seniority: SeniorityEnum;
    englishLevel: EnglishLevelEnum;
    techLead: boolean;
    status: ResourceStatusEnum;
    skills: Skill[];
    comments: string; 
}

export interface BsonId {
    id: string;
}

export interface ResourceUpdateInfo {
    name: string;
    lastName: string;
    gender: GenderEnum;
    status: ResourceStatusEnum;
    techLead: boolean | string;
    englishLevel: EnglishLevelEnum;
    salary: number;
}

export interface ResourceAddProject {
    project?: Project | undefined;
    beginDate?: Date | undefined;
    endDate?: Date | undefined;
}