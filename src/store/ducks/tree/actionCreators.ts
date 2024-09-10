import { LoadingStatus } from "../../../types/common";
import {
    fetchTreeActionInterface,
    fetchTreeByUsernameActionInterface,
    setTreeActionInterface,
    setTreeByUsernameActionInterface,
    setTreeStatusActionInterface,
    TreeActionsType
} from "./contracts/actionType";

export const fetchTree = (): fetchTreeActionInterface => ({
    type: TreeActionsType.FETCH_TREE
});
export const setTree = (payload: any): setTreeActionInterface => ({
    type: TreeActionsType.SET_TREE,
    payload
});
export const fetchTreeByUsername = (payload: string): fetchTreeByUsernameActionInterface => ({
    type: TreeActionsType.FETCH_TREE_USERNAME,
    payload
});
export const setTreeByUsername = (payload: any): setTreeByUsernameActionInterface => ({
    type: TreeActionsType.SET_TREE_BY_USERNAME,
    payload
});

export const settTreeStatus = (payload: LoadingStatus): setTreeStatusActionInterface => ({
    type: TreeActionsType.SET_TREE_STATUS,
    payload
});
