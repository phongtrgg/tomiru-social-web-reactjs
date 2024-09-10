import React from "react";
import a1 from "../../../../assets/BackgroundMessage/background-dep-de-ghep-anh.jpg";
import { UserResponse } from "../../../../types/user";
import { DEFAULT_PROFILE_IMG } from "../../../../constants/url-constants";

interface SuggestUserGroupChatProps {
    selectedUsers: UserResponse[];
    onRemoveUser: (userId: number) => void;

}

const SuggestUserGroupChat: React.FC<SuggestUserGroupChatProps> = ({ selectedUsers, onRemoveUser }) => {

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                padding: "10px",
            }}
        >
            {selectedUsers.map(user => (
                <div
                    key={user.id}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "auto",
                        height: "30px",
                        borderRadius: "20px",
                        border: "1px solid #ccc",
                        padding: "5px 10px"
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <img src={user.avatar ?? DEFAULT_PROFILE_IMG} alt="User Avatar" style={{ width: "25px", height: "25px", borderRadius: "50%" }} />
                        <p>{user.fullName}</p>
                    </div>
                    <div style={{ cursor: "pointer", marginLeft: "25px" }} onClick={() => onRemoveUser(user.id)}>X</div>
                </div>
            ))}
        </div>
    );
};

export default SuggestUserGroupChat;
