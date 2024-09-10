import { Action } from "redux";
import { LoadingStatus } from "../../../../types/common";
import { buyPackagesRequest } from "../../../../types/wallet";

export enum TreeActionsType {
    FETCH_TREE = "pakage/TREE",
    SET_TREE = "pakage/SET_TREE",
    FETCH_TREE_USERNAME = "pakage/TREE_USERNAME",
    SET_TREE_STATUS = "pakage/TREE_STATUS",
    SET_TREE_BY_USERNAME = "pakage/SET_TREE_BY_USERNAME"
}

export interface fetchTreeActionInterface extends Action<TreeActionsType> {
    type: TreeActionsType.FETCH_TREE;
}
export interface setTreeActionInterface extends Action<TreeActionsType> {
    type: TreeActionsType.SET_TREE;
    payload: any;
}
export interface fetchTreeByUsernameActionInterface extends Action<TreeActionsType> {
    type: TreeActionsType.FETCH_TREE_USERNAME;
    payload: string;
}
export interface setTreeByUsernameActionInterface extends Action<TreeActionsType> {
    type: TreeActionsType.SET_TREE_BY_USERNAME;
    payload: any;
}

export interface setTreeStatusActionInterface extends Action<TreeActionsType> {
    type: TreeActionsType.SET_TREE_STATUS;
    payload: LoadingStatus;
}

export type PackagesActions =
    | fetchTreeActionInterface
    | fetchTreeByUsernameActionInterface
    | setTreeActionInterface
    | setTreeStatusActionInterface
    | fetchTreeByUsernameActionInterface
    | setTreeByUsernameActionInterface;
