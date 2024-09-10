import produce, { Draft } from "immer";
import { TweetsState } from "./contracts/state";
import { TweetsActions, TweetsActionType } from "./contracts/actionTypes";
import { LoadingStatus, NotificationType } from "../../../types/common";
import { NotificationReplyResponse, NotificationResponse } from "../../../types/notification";
import { TweetResponse } from "../../../types/tweet";

export const initialTweetsState: TweetsState = {
    items: [],
    pagesCount: 1,
    loadingState: LoadingStatus.LOADING,
    error: undefined,
    selectedTweet: undefined
};

export const tweetsReducer = produce((draft: Draft<TweetsState>, action: TweetsActions) => {
    switch (action.type) {
        case TweetsActionType.SET_TWEETS:
            draft.items = [...draft.items, ...action.payload];
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case TweetsActionType.SET_SCHEDULED_TWEETS:
            draft.items = [...action.payload, ...draft.items];
            break;

        case TweetsActionType.SET_PAGEABLE_TWEETS:
            draft.items = [...draft.items, ...action.payload.items];
            draft.pagesCount = action.payload.pagesCount;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case TweetsActionType.SET_TWEET:
            draft.items = [action.payload, ...draft.items];
            break;

        case TweetsActionType.RESET_TWEETS:
            draft.items = [];
            draft.pagesCount = 1;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case TweetsActionType.SET_UPDATED_TWEET:
            if (action.payload.notificationType === NotificationType.LIKE) {
                const payload = action.payload as NotificationResponse;
                const likedTweetIndex = draft.items.findIndex((tweet) => tweet.id === payload.tweet.id);
                if (likedTweetIndex !== -1) {
                    draft.items[likedTweetIndex].isTweetLiked = payload.tweet.notificationCondition;
                    draft.items[likedTweetIndex].likesCount = payload.tweet.notificationCondition
                        ? draft.items[likedTweetIndex].likesCount + 1
                        : draft.items[likedTweetIndex].likesCount - 1;
                }
            } else if (action.payload.notificationType === NotificationType.RETWEET) {
                const payload = action.payload as NotificationResponse;
                const retweetedTweetIndex = draft.items.findIndex((tweet) => tweet.id === payload.tweet.id);
                if (retweetedTweetIndex !== -1) {
                    draft.items[retweetedTweetIndex].isTweetRetweeted = payload.tweet.notificationCondition;
                    draft.items[retweetedTweetIndex].retweetsCount = payload.tweet.notificationCondition
                        ? draft.items[retweetedTweetIndex].retweetsCount + 1
                        : draft.items[retweetedTweetIndex].retweetsCount - 1;
                }
            } else if (action.payload.notificationType === NotificationType.REPLY) {
                const payload = action.payload as NotificationReplyResponse;
                const repliedTweetIndex = draft.items.findIndex((tweet) => tweet.id === payload.tweetId);
                if (repliedTweetIndex !== -1)
                    draft.items[repliedTweetIndex].repliesCount = draft.items[repliedTweetIndex].repliesCount + 1;
            }
            break;

        case TweetsActionType.SET_UPDATED_BOOKMARKED_TWEET:
            const bookmarkedTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.tweetId);
            if (bookmarkedTweetIndex !== -1)
                draft.items[bookmarkedTweetIndex].isTweetBookmarked = action.payload.isTweetBookmarked;
            break;

        case TweetsActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        case TweetsActionType.REMOVE_TWEET_FROM_BOOKMARKS:
            draft.items = draft.items.filter((tweet) => tweet.id !== action.payload);
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case TweetsActionType.DELETE_TWEET:
            draft.items = draft.items.filter((tweet) => tweet.id !== action.payload);
            break;

        case TweetsActionType.SET_VOTE:
            const tweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.id);
            if (tweetIndex !== -1) draft.items[tweetIndex].poll.pollChoices = action.payload.poll.pollChoices;
            break;

        case TweetsActionType.SET_FOLLOW_TO_TWEETS_STATE:
            if (action.payload.tweetId) {
                const followUserTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.tweetId);
                if (followUserTweetIndex !== -1)
                    draft.items[followUserTweetIndex].author.isFollower = action.payload.isFollower;
            } else {
                draft.items = draft.items.map((tweet) => {
                    if (tweet.author.id === action.payload.userId) {
                        tweet.author.isFollower = action.payload.isFollower;
                        return tweet;
                    } else {
                        return tweet;
                    }
                });
            }
            break;

        case TweetsActionType.SET_BLOCKED_TO_TWEETS_STATE:
            if (action.payload.tweetId) {
                const blockedUserTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.tweetId);
                if (blockedUserTweetIndex !== -1)
                    draft.items[blockedUserTweetIndex].author.isUserBlocked = action.payload.isUserBlocked;
            } else {
                draft.items = draft.items.map((tweet) => {
                    if (tweet.author.id === action.payload.userId) {
                        tweet.author.isUserBlocked = action.payload.isUserBlocked;
                        return tweet;
                    } else {
                        return tweet;
                    }
                });
            }
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case TweetsActionType.SET_MUTED_TO_TWEETS_STATE:
            if (action.payload.tweetId) {
                const mutedUserTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.tweetId);
                if (mutedUserTweetIndex !== -1)
                    draft.items[mutedUserTweetIndex].author.isUserMuted = action.payload.isUserMuted;
            } else {
                draft.items = draft.items.map((tweet) => {
                    if (tweet.author.id === action.payload.userId) {
                        tweet.author.isUserMuted = action.payload.isUserMuted;
                        return tweet;
                    } else {
                        return tweet;
                    }
                });
            }
            draft.loadingState = LoadingStatus.LOADED;
            break;
        // Thêm case mới để xử lý EDIT_TWEET
        case TweetsActionType.EDIT_TWEET as TweetsActionType:
            // const editTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.id);

            // if (editTweetIndex !== -1) {
            //     draft.items[editTweetIndex] = {
            //         ...draft.items[editTweetIndex],
            //         ...action.payload,
            //         scheduledDate: action.payload.scheduledDate
            //             ? action.payload.scheduledDate instanceof Date
            //                 ? action.payload.scheduledDate.toISOString()
            //                 : action.payload.scheduledDate
            //             : draft.items[editTweetIndex].scheduledDate, // Giữ nguyên giá trị cũ nếu không có
            //         taggedImageUsers: draft.items[editTweetIndex].taggedImageUsers // Giữ nguyên taggedImageUsers từ dữ liệu gốc
            //     };
            // }
            break;
        case TweetsActionType.EDIT_TWEET_REQUEST:
            break;

        // lấy ra bài viết cần sửa
        case TweetsActionType.GET_TWEET_SUCCESS:
            draft.selectedTweet = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;
        // sửa bài viết
        case TweetsActionType.EDIT_TWEET_SUCCESS:
            // const newTweet = draft.items.findIndex((tweet) => tweet.id === action.payload.id);
            // if (newTweet !== -1) {
            //     draft.items[newTweet] = action.payload;
            // }

            draft.loadingState = LoadingStatus.SUCCESS;
            break;
        // draft.items.map((tweet) => tweet.id === action.payload.id ?
        //     {
        //         tweet: action.payload
        //     } : {
        //         tweet
        //     }
        // );
        // draft.loadingState = LoadingStatus.LOADED;
        // break;
        // case TweetsActionType.GET_TWEET_FAILURE:
        case TweetsActionType.EDIT_TWEET_FAILURE:
            draft.error = action.payload;
            break;
        case TweetsActionType.ADD_TWEET_SUCCESS:
            draft.loadingState = LoadingStatus.SUCCESS;
            break;
        case TweetsActionType.RESET_STATE:
            draft.loadingState = LoadingStatus.LOADED;
            break;
        default:
            break;
    }
}, initialTweetsState);
