import fetchDataService from '../common/fetchDataService';
import { IExperimentAssignment } from 'upgrade_types';
import { Types } from '../identifiers';

export default async function getAllExperimentConditions(url: string, userId: string, token: string, context: string): Promise<IExperimentAssignment[]> {
  try {
    const params: any = {
      userId,
      context
    };
    const experimentConditionResponse = await fetchDataService(url, token, params, Types.REQUEST_TYPES.POST);
    if (experimentConditionResponse.status) {
      if (Array.isArray(experimentConditionResponse.data)) {
        experimentConditionResponse.data = experimentConditionResponse.data.map(data => {
          return {
            ...data,
            assignedCondition: {
              conditionCode: data.assignedCondition.conditionCode,
              twoCharacterId: data.assignedCondition.twoCharacterId,
              description: data.assignedCondition.description
            }
          }
        });
        return experimentConditionResponse.data;
      }
      // If type is not array then it is an error
      throw new Error(experimentConditionResponse.data);
    } else {
      throw new Error(experimentConditionResponse.message);
    }
  } catch (error) {
    throw new Error(error);
  }
}