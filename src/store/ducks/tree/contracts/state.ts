import { AnyAction } from "redux-saga";
import { LoadingStatus } from "../../../../types/common";

export interface TreeState {
    treeResult?: any;
    treeByUser?: any;
    treeLoadingState: LoadingStatus;
}

export interface TreeResponse {
    f1: Array<object>;
    f1NotMember: Array<object>;
    incomePXU: number;
    incomeXU: number;
    trees: Array<object>;
}
