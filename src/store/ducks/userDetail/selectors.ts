import { RootState } from "../../store";
import { UserDetailState } from "./contracts/state";
import { DEFAULT_PROFILE_IMG } from "../../../constants/url-constants";
import { LoadingStatus } from "../../../types/common";

export const selectUserDetail = (state: RootState): UserDetailState => state.userDetail;
export const selectUserDetailItem = (state: RootState) => selectUserDetail(state).item;
export const selectUserDetailId = (state: RootState) => selectUserDetailItem(state)?.id;
export const selectUserDetailUsername = (state: RootState) => selectUserDetailItem(state)?.username;
export const selectUserDetailFullName = (state: RootState) => selectUserDetailItem(state)?.fullName;
export const selectUserDetailAbout = (state: RootState) => selectUserDetailItem(state)?.about;
export const selectUserDetailFollowersCount = (state: RootState) => selectUserDetailItem(state)?.followersCount;
export const selectUserDetailFollowingCount = (state: RootState) => selectUserDetailItem(state)?.followingCount;
export const selectUserDetailAvatar = (state: RootState) => selectUserDetailItem(state)!.avatar ?? DEFAULT_PROFILE_IMG;
export const selectUserDetailIsMyProfileBlocked = (state: RootState) => selectUserDetailItem(state)?.isMyProfileBlocked;
export const selectUserDetailIsFollower = (state: RootState) => selectUserDetailItem(state)?.isFollower;
export const selectUserDetailIsUserBlocked = (state: RootState) => selectUserDetailItem(state)?.isUserBlocked;
export const selectUserDetailIsWaitingForApprove = (state: RootState) =>
    selectUserDetailItem(state)?.isWaitingForApprove;
export const selectUserDetailIsPrivateProfile = (state: RootState) => selectUserDetailItem(state)?.isPrivateProfile;
export const selectUserDetailSameFollowers = (state: RootState) => selectUserDetailItem(state)?.sameFollowers;
export const selectLoadingState = (state: RootState): LoadingStatus => selectUserDetail(state).loadingState;
export const selectIsUserDetailLoading = (state: RootState): boolean =>
    selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsUserDetailLoaded = (state: RootState): boolean =>
    selectLoadingState(state) === LoadingStatus.LOADED;
export const selectIsUserDetailError = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.ERROR;
