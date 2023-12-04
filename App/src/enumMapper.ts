import { EnglishLevelEnum, FullFilmentStatusEnum, ResourceStatusEnum, SeniorityEnum, VagaStatusEnum } from "./types";


export const SeniorityEnumLabel  = {
    [SeniorityEnum.JuniorBeginner]: "Junior Beginner",
    [SeniorityEnum.JuniorMid]: "Junior MId",
    [SeniorityEnum.JuniorTop]: "Junior Top",
    [SeniorityEnum.MidBeginner]: "Mid Beginner",
    [SeniorityEnum.MidMid]: "Mid Mid",
    [SeniorityEnum.MidTop]: "Mid Top",
    [SeniorityEnum.Senior]: "Senior",
    [SeniorityEnum.SeniorTop]: "Senior Top",
    [SeniorityEnum.Intern]: "Intern"
}

export const EnglishLevelEnumLabel = {
    [EnglishLevelEnum.Basic]: "Basic",
    [EnglishLevelEnum.Intermidiate]: "Intermediate",
    [EnglishLevelEnum.Advacend]: "Advanced"
}


export const ResourceStatusEnumLabel = {
    [ResourceStatusEnum.NonBilled]: "Non Billed",
    [ResourceStatusEnum.ResourceReductionPlanned]: "Resource Reduction Planned",
    [ResourceStatusEnum.ResourceTransictionPlanned]: "Resource Transiction Planned"
}

export const FullFilmentStatusEnumLabel = {
    [FullFilmentStatusEnum.UnderEvaluation]: 'UNDEREVAL',
    [FullFilmentStatusEnum.Selected]: 'SELECTED',
    [FullFilmentStatusEnum.PreSelect]: 'PRESELECTED',
    [FullFilmentStatusEnum.Discarded]: 'DISCARDED'
}

export const PositionStatusEnumLabel = {
    [VagaStatusEnum.Planned]: 'Planned',
    [VagaStatusEnum.Open]: 'Open',
    [VagaStatusEnum.Closed]: 'Closed',
    [VagaStatusEnum.Canceled]: 'Canceled'
}