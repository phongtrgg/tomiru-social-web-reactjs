import { TreeState } from "./contracts/state";
import { RootState } from "../../store";
import { LoadingStatus } from "../../../types/common";

const selectTree = (state: RootState): TreeState => state.tree;
export const selectTreeResult = (state: RootState): TreeState["treeResult"] | undefined => selectTree(state).treeResult;
export const selectTreeF1 = (state: RootState): TreeState["treeResult"]["f1"] | undefined => {
    const treeResult = selectTree(state).treeResult;
    return treeResult ? treeResult.f1 : undefined;
};

export const selectTrees = (state: RootState): TreeState["treeResult"]["trees"][number] | undefined => {
    const treeResult = selectTree(state).treeResult;
    return treeResult && treeResult.trees.length > 0 ? treeResult.trees[0] : undefined;
};
export const selectTreesByUser = (state: RootState): TreeState["treeResult"]["trees"][number] | undefined => {
    const treeResult = selectTree(state).treeByUser;
    return treeResult && treeResult.trees.length > 0 ? treeResult.trees[0] : undefined;
};

export const selectTreesToken = (state: RootState): number | undefined => {
    const treeResult = selectTree(state).treeResult;
    const token = treeResult?.trees[0]?.usersBalances?.[1]?.balance;
    return token !== undefined ? parseFloat(parseFloat(token).toFixed(2)) : undefined;
};
export const selectTreeStatus = (state: RootState): TreeState["treeLoadingState"] => selectTree(state).treeLoadingState;
