import {
    selectErrorMessage,
    selectIsLikedUsersLoading,
    selectIsRepliesLoading,
    selectIsRetweetedUsersLoading,
    selectIsTaggedImageUsersLoading,
    selectIsTweetError,
    selectIsTweetLiked,
    selectIsTweetLoadedSuccess,
    selectIsTweetLoading,
    selectIsTweetRetweeted,
    selectlikesCount,
    selectLikedUsers,
    selectLinkCover,
    selectLinkCoverSize,
    selectLinkDescription,
    selectLinkTitle,
    selectQuotesCount,
    selectReplies,
    selectRepliesCount,
    selectRetweetedUsers,
    selectRetweetsCount,
    selectTaggedImageUsers,
    selectTweetData,
    selectTweetCreatedAt,
    selectTweetId,
    selectTweetImageDescription,
    selectTweetImages,
    selectTweetLink,
    selectTweetList,
    selectTweetPoll,
    selectTweetQuote,
    selectTweetReplyType,
    selectTweetTaggedImageUsers,
    selectTweetText,
    selectTweetAuthor,
    selectTweetAuthorAvatar,
    selectTweetAuthorFullName,
    selectTweetAuthorId,
    selectTweetAuthorIsFollower,
    selectTweetAuthorUsername,
    selectUsersPagesCount
} from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { mockFullTweet, mockTweets, mockUsers } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";

describe("tweet selectors:", () => {
    const mockState = createMockRootState();
    const mockTweetState = {
        ...mockState,
        tweet: {
            ...mockState.tweet,
            tweet: mockFullTweet,
            likedUsers: mockUsers,
            retweetedUsers: mockUsers,
            replies: mockTweets,
            errorMessage: "Tweet not found"
        }
    };

    describe("selectTweetData", () => {
        it("should return TweetResponse", () => {
            expect(selectTweetData(mockTweetState)).toBe(mockFullTweet);
        });
    });

    describe("selectUsersPagesCount", () => {
        it("should return Pages Count number", () => {
            expect(selectUsersPagesCount(mockState)).toBe(0);
        });
    });

    describe("selectIsTweetLoading", () => {
        it("should return correct result", () => {
            expect(selectIsTweetLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsTweetLoadedSuccess", () => {
        it("should return correct result", () => {
            expect(selectIsTweetLoadedSuccess(createMockRootState(LoadingStatus.SUCCESS))).toBe(true);
        });
    });

    describe("selectIsTweetError", () => {
        it("should return correct result", () => {
            expect(selectIsTweetError(createMockRootState(LoadingStatus.ERROR))).toBe(true);
        });
    });

    describe("selectErrorMessage", () => {
        it("should return correct result", () => {
            expect(selectErrorMessage(mockTweetState)).toBe("Tweet not found");
        });
    });

    describe("selectTweetId", () => {
        it("should return TweetId number", () => {
            expect(selectTweetId(mockState)).toBe(9);
        });
    });

    describe("selectTweetText", () => {
        it("should return TweetText string", () => {
            expect(selectTweetText(mockState)).toBe("#FirstTweet");
        });
    });

    describe("selectTweetReplyType", () => {
        it("should return TweetReplyType", () => {
            expect(selectTweetReplyType(mockState)).toBe("EVERYONE");
        });
    });

    describe("selectIsTweetLiked", () => {
        it("should return IsTweetLiked boolean", () => {
            expect(selectIsTweetLiked(mockState)).toBe(true);
        });
    });

    describe("selectIsTweetRetweeted", () => {
        it("should return IsTweetRetweeted boolean", () => {
            expect(selectIsTweetRetweeted(mockState)).toBe(true);
        });
    });

    describe("selectRepliesCount", () => {
        it("should return RepliesCount number", () => {
            expect(selectRepliesCount(mockState)).toBe(2);
        });
    });

    describe("selectRetweetsCount", () => {
        it("should return RetweetsCount number", () => {
            expect(selectRetweetsCount(mockState)).toBe(2);
        });
    });

    describe("selectQuotesCount", () => {
        it("should return QuotesCount number", () => {
            expect(selectQuotesCount(mockState)).toBe(2);
        });
    });

    describe("selectlikesCount", () => {
        it("should return likesCount number", () => {
            expect(selectlikesCount(mockState)).toBe(2);
        });
    });

    describe("selectTweetCreatedAt", () => {
        it("should return TweetDateTime", () => {
            expect(selectTweetCreatedAt(mockState)).toBe("2021-10-15T21:20:33");
        });
    });

    describe("selectTweetImages", () => {
        it("should return TweetImages", () => {
            expect(selectTweetImages(mockState)).toBe(mockFullTweet.images);
        });
    });

    describe("selectTweetImageDescription", () => {
        it("should return string", () => {
            expect(selectTweetImageDescription(mockState)).toBe(mockFullTweet.imageDescription);
        });
    });

    describe("selectTweetTaggedImageUsers", () => {
        it("should return string", () => {
            expect(selectTweetTaggedImageUsers(mockState)).toBe(mockFullTweet.taggedImageUsers);
        });
    });

    describe("selectTweetPoll", () => {
        it("should return TweetPoll", () => {
            expect(selectTweetPoll(mockState)).toBe(mockFullTweet.poll);
        });
    });

    describe("selectTweetQuote", () => {
        it("should return TweetQuote", () => {
            expect(selectTweetQuote(mockState)).toBe(mockFullTweet.quoteTweet);
        });
    });

    describe("selectTweetList", () => {
        it("should return TweetListResponse", () => {
            expect(selectTweetList(mockState)).toBe(mockFullTweet.tweetList);
        });
    });

    describe("selectTweetAuthor", () => {
        it("should return TweetAuthor", () => {
            expect(selectTweetAuthor(mockState)).toBe(mockFullTweet.author);
        });
    });

    describe("selectTweetAuthorId", () => {
        it("should return TweetAuthorId number", () => {
            expect(selectTweetAuthorId(mockState)).toBe(mockFullTweet.author.id);
        });
    });

    describe("selectTweetAuthorAvatar", () => {
        it("should return TweetAuthorAvatar", () => {
            expect(selectTweetAuthorAvatar(mockState)).toBe(mockFullTweet.author.avatar);
        });
    });

    describe("selectTweetAuthorUsername", () => {
        it("should return TweetAuthorUsername string", () => {
            expect(selectTweetAuthorUsername(mockState)).toBe("JavaCat");
        });
    });

    describe("selectTweetAuthorFullName", () => {
        it("should return TweetAuthorFullName string", () => {
            expect(selectTweetAuthorFullName(mockState)).toBe("JavaCat");
        });
    });

    describe("selectTweetAuthorIsFollower", () => {
        it("should return TweetAuthorIsFollower boolean", () => {
            expect(selectTweetAuthorIsFollower(mockState)).toBe(false);
        });
    });

    describe("selectTweetLink", () => {
        it("should return TweetLink string", () => {
            expect(selectTweetLink(mockState)).toBe(mockFullTweet.link);
        });
    });

    describe("selectLinkCover", () => {
        it("should return LinkCover string", () => {
            expect(selectLinkCover(mockState)).toBe(mockFullTweet.linkCover);
        });
    });

    describe("selectLinkCoverSize", () => {
        it("should return LinkCoverSize string", () => {
            expect(selectLinkCoverSize(mockState)).toBe(null);
        });
    });

    describe("selectLinkTitle", () => {
        it("should return LinkTitle string", () => {
            expect(selectLinkTitle(mockState)).toBe(mockFullTweet.linkTitle);
        });
    });

    describe("selectLinkDescription", () => {
        it("should return LinkDescription string", () => {
            expect(selectLinkDescription(mockState)).toBe(null);
        });
    });

    describe("selectLikedUsers", () => {
        it("should return UserResponse array", () => {
            expect(selectLikedUsers(mockTweetState)).toBe(mockUsers);
        });
    });

    describe("selectIsLikedUsersLoading", () => {
        it("should return correct result", () => {
            expect(selectIsLikedUsersLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectRetweetedUsers", () => {
        it("should return UserResponse array", () => {
            expect(selectRetweetedUsers(mockTweetState)).toBe(mockUsers);
        });
    });

    describe("selectIsRetweetedUsersLoading", () => {
        it("should return correct result", () => {
            expect(selectIsRetweetedUsersLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectTaggedImageUsers", () => {
        it("should return UserResponse array", () => {
            expect(selectTaggedImageUsers(mockTweetState)).toBe(mockUsers);
        });
    });

    describe("selectIsTaggedImageUsersLoading", () => {
        it("should return correct result", () => {
            expect(selectIsTaggedImageUsersLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectReplies", () => {
        it("should return TweetResponse array", () => {
            expect(selectReplies(mockTweetState)).toBe(mockTweets);
        });
    });

    describe("selectIsRepliesLoading", () => {
        it("should return correct result", () => {
            expect(selectIsRepliesLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });
});
