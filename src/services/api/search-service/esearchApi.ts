import axios, { AxiosResponse } from "axios";

import { UserResponse } from "../../../types/user";
import { TweetResponse, TweetAdditionalInfoResponse, TweetImageResponse } from "../../../types/tweet";
import { TagResponse } from "../../../types/tag";
import { FetchTweetsByTagRequest, FetchTweetsByTextRequest } from "../../../store/ducks/tweets/contracts/state";
import { SearchByNameRequest } from "../../../store/ducks/usersSearch/contracts/state";
import { UI_V1_SEARCH, UI_V1_SEARCH_TAG, UI_V1_SEARCH_USER, UI_V1_SEARCH_TEXT } from "../../../constants/endpoint-constants";
import { promises } from "dns";


export const esearchApi = {
    async getUsersByUserName({ username, pageNumber }:SearchByNameRequest): Promise<AxiosResponse<UserResponse[]>>{
        return await axios.get<UserResponse[]>(UI_V1_SEARCH_USER, { params: { userName: username, size: pageNumber },  }, );

    },
    async getTweetsByTagName({ tag }: FetchTweetsByTagRequest): Promise<AxiosResponse<TweetResponse[]>>{
        return await axios.get<TweetResponse[]>(UI_V1_SEARCH_TAG, { params: { tagName: tag } });
    },
    async getTweetsByText(text: string, pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_SEARCH_TEXT, { params: {text: text, size: pageNumber } });
    },
};