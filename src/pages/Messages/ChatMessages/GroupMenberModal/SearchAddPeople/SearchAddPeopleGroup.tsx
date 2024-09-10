import React, { FC, memo, ReactElement, useState } from "react";
import { InputAdornment } from "@material-ui/core";
import { SearchIcon } from "../../../../../icons";
import { SearchAddPeopleStyle } from "./SearchAddPepleStyle";
import { UserResponse } from "../../../../../types/user";
import { useTranslation } from "react-i18next";

interface SearchAddPeopleGroupProps {
    onSearch: (text: string) => void;
    searchText: string;
}
const SearchAddPeopleGroup: FC<SearchAddPeopleGroupProps> = ({ searchText, onSearch }): ReactElement => {
    // const [text, setText] = useState<string>("");
    const { t } = useTranslation();
    return (
        <SearchAddPeopleStyle
            placeholder={t("search-messages")}
            variant="outlined"
            onChange={(event: any) => onSearch(event.target.value)}
            value={searchText}
            InputProps={{
                startAdornment: <InputAdornment position="start">{SearchIcon}</InputAdornment>
            }}
        />
    );
};

export default SearchAddPeopleGroup;
