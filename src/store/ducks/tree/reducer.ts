import produce, { Draft } from "immer";

import { LoadingStatus } from "../../../types/common";
import { TreeState } from "./contracts/state";
import { PackagesActions, TreeActionsType } from "./contracts/actionType";

export const initialSearchState: TreeState = {
    treeResult: undefined,
    treeByUser: undefined,
    treeLoadingState: LoadingStatus.LOADING
};

export const treeReducer = produce((draft: Draft<TreeState>, action: PackagesActions) => {
    switch (action.type) {
        case TreeActionsType.SET_TREE:
            draft.treeResult = action.payload;
            draft.treeLoadingState = LoadingStatus.SUCCESS;
            break;
        case TreeActionsType.SET_TREE_BY_USERNAME:
            draft.treeByUser = action.payload;
            break;
        default:
            break;
    }
}, initialSearchState);
