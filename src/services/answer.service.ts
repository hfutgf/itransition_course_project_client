import { queryConfig } from "@/config/query.config";
import { Common } from "./common.service";
import {
  IAnswer,
  IAnswerForm,
  IAnswerOption,
  IForm,
} from "@/types/answer.types";

export class AnswerService extends Common {
  constructor() {
    super();
  }

  createForm = async (body: Omit<IForm, "id">) => {
    try {
      const response = await this.axiosWithAuth.post<IForm>(
        queryConfig.CRUD_FORMS,
        body
      );
      return response.data;
    } catch (error) {
      const e = error as Error;
      console.error(e.message);
    }
  };

  createAnswer = async (body: IAnswerForm) => {
    try {
      const response = await this.axiosWithAuth.post<IAnswer>(
        queryConfig.CURD_ANSWER,
        body
      );
      return response.data;
    } catch (error) {
      const e = error as Error;
      console.error(e.message);
    }
  };

  getAnswersByForm = async (formId: number) => {
    try {
      const response = await this.axiosWithAuth.get<IAnswer[]>(
        queryConfig.CURD_ANSWER + "/" + formId
      );
      return response.data;
    } catch (error) {
      const e = error as Error;
      console.error(e.message);
    }
  };

  getAnswerOptions = async (answerId: number) => {
    try {
      const response = await this.axiosWithAuth.get<IAnswerOption[]>(
        queryConfig.CRUD_ANSWER_OPTIONS + "/" + answerId
      );
      return response.data;
    } catch (error) {
      const e = error as Error;
      console.error(e.message);
    }
  };
}
