import { all } from "redux-saga/effects";

import { tweetsSaga, watchEditTweet } from "./ducks/tweets/sagas";
import { tagsSaga } from "./ducks/tags/sagas";
import { tweetSaga } from "./ducks/tweet/sagas";
import { usersSaga } from "./ducks/users/sagas";
import { userSaga } from "./ducks/user/sagas";
import { userTweetsSaga } from "./ducks/userTweets/sagas";
import { userProfileSaga } from "./ducks/userProfile/sagas";
import { usersSearchSaga } from "./ducks/usersSearch/sagas";
import { chatsSaga } from "./ducks/chats/sagas";
import { chatMessagesSaga } from "./ducks/chatMessages/sagas";
import { notificationsSaga } from "./ducks/notifications/sagas";
import { listsSaga } from "./ducks/lists/sagas";
import { listSaga } from "./ducks/list/sagas";
import { fetchFollowerSaga } from "./ducks/followerRequests/sagas";
import { blockedAndMutedUsersSaga } from "./ducks/blockedAndMutedUsers/sagas";
import { listMembersSaga } from "./ducks/listMembers/sagas";
import { userDetailSaga } from "./ducks/userDetail/sagas";
import { listDetailSaga } from "./ducks/listDetail/sagas";
import { unsentTweetsSaga } from "./ducks/unsentTweets/sagas";
import { tweetAdditionalInfoSaga } from "./ducks/tweetAdditionalInfo/saga";
import { chatSaga } from "./ducks/chat/sagas";
import { topicsSaga } from "./ducks/topics/sagas";
import { searchSaga } from "./ducks/search/sagas";
import { addTweetFormSaga } from "./ducks/addTweetForm/sagas";
import { authenticationSaga } from "./ducks/authentication/sagas";
import backgroundSaga from "./ducks/changeBackgroundChat/sagas";
import { friendsUserSaga } from "./ducks/friendUser/sagas";
import { friendsRequestsSaga } from "./ducks/friendRequests/sagas";
import { friendsOfAuthUserSaga } from "./ducks/friendsOfAuthUer/sagas";
import { packagesSaga } from "./ducks/packages/sagas";
import { treeSaga } from "./ducks/tree/sagas";
import { walletUserSaga } from "./ducks/wallet/sagas";
import { walletHistorySaga } from "./ducks/walletHistory/sagas";
import { agentsSaga } from "./ducks/agents/sagas";
import { vaultSaga } from "./ducks/vault/sagas";

export default function* rootSaga() {
    yield all([
        watchEditTweet(),
        userSaga(),
        tweetSaga(),
        userProfileSaga(),
        usersSaga(),
        tagsSaga(),
        topicsSaga(),
        userTweetsSaga(),
        usersSearchSaga(),
        chatsSaga(),
        chatMessagesSaga(),
        notificationsSaga(),
        listsSaga(),
        listSaga(),
        fetchFollowerSaga(),
        blockedAndMutedUsersSaga(),
        listMembersSaga(),
        userDetailSaga(),
        tweetsSaga(),
        listDetailSaga(),
        unsentTweetsSaga(),
        tweetAdditionalInfoSaga(),
        chatSaga(),
        searchSaga(),
        addTweetFormSaga(),
        authenticationSaga(),
        backgroundSaga(),
        friendsUserSaga(),
        friendsRequestsSaga(),
        friendsOfAuthUserSaga(),
        packagesSaga(),
        treeSaga(),
        friendsOfAuthUserSaga(),
        walletUserSaga(),
        walletHistorySaga(),
        agentsSaga(),
        vaultSaga()
    ]);
}
