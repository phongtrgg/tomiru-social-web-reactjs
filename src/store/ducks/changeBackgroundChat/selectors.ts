import { RootState } from "../../store";
import { BackgroundState } from "./contracts/state";
import { DEFAULT_PROFILE_IMG } from "../../../constants/url-constants";

export const selectBackgroundChat = (state: RootState): BackgroundState => state.backgroundChat;

export const selectBackgroundItem = (state: RootState): string | null => selectBackgroundChat(state).item;

// Ví dụ về cách sử dụng selectBackgroundItem trong các selector khác:

