import React, { memo, ReactElement, useState } from "react";
import { InputAdornment } from "@material-ui/core";

import { SearchIcon } from "../../../icons";
import { PeopleSearchInput } from "../PeopleSearchInput/PeopleSearchInput";
import { useTranslation } from "react-i18next";

const SearchChatParticipant = memo((): ReactElement => {
    const [text, setText] = useState<string>("");
    const { t } = useTranslation();
    return (
        <PeopleSearchInput
            placeholder={t("search-messages")}
            variant="outlined"
            onChange={(event) => setText(event.target.value)}
            value={text}
            InputProps={{
                startAdornment: <InputAdornment position="start">{SearchIcon}</InputAdornment>
            }}
        />
    );
});

export default SearchChatParticipant;
