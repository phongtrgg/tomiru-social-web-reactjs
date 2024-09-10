import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { CircularProgress, Container, Divider } from "@material-ui/core";
import { useTreePlantStyles } from "../TreePlantStyles";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import OrgChartTree from "../TreePlant";
import { formatTimestamp } from "../../../util/format-date-helper";
import { useDispatch, useSelector } from "react-redux";
import { fetchTreeByUsername } from "../../../store/ducks/tree/actionCreators";
import { selectTreesByUser } from "../../../store/ducks/tree/selectors";
import { RawNodeDatum } from "react-d3-tree";
import { useTranslation } from "react-i18next";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

interface BasicTabsProps {
    data: any;
    onClose: () => void;
}
export default function BasicTabs({ data, onClose }: BasicTabsProps) {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const classes = useTreePlantStyles();
    const [loading, setLoading] = React.useState(true);
    const [createdAt, setCreatedAt] = React.useState("");
    const tree = useSelector(selectTreesByUser);
    const [openUserDetails, setOpenUserDetails] = React.useState(false);
    const [infoUserDetails, setInfoUserDetails] = React.useState({});
    const { t } = useTranslation();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const nodeSize = { x: 40, y: 100 };
    const translate = { x: 300, y: 50 };

    const formattedDateLong = formatTimestamp(data.createdAt);

    React.useEffect(() => {
        if (formattedDateLong) {
            setCreatedAt(formattedDateLong);
        }
    }, [data, formattedDateLong]);
    const transformData = (data: any, depth: number = 0): RawNodeDatum => {
        return {
            name: data.firstName + " " + data.lastName,
            attributes: {
                email: data.email
            },
            children: data.children ? data.children.map((child: any) => transformData(child, depth + 1)) : []
        };
    };
    const [showData, setShowData] = React.useState<any>();
    React.useEffect(() => {
        if (tree) {
            const transformedData = tree ? transformData(tree) : undefined;
            setShowData(transformedData);
        }
    }, [tree]);
    const findItemByEmail = (node: any, email: string): any => {
        if (node.email === email) {
            return node;
        }
        if (node.children) {
            for (const child of node.children) {
                const result = findItemByEmail(child, email);

                if (result) return result;
            }
        }
        return null;
    };
    const showDetails = (email: string) => {
        const item = tree ? findItemByEmail(tree, email) : null;

        if (item) {
            setInfoUserDetails(item);
            setOpenUserDetails(true);
        } else {
            console.log("Item not found");
        }
    };

    React.useEffect(() => {
        if (value === 1 && data) {
            dispatch(fetchTreeByUsername(data.username));
        }
    }, [data, value]);
    return (
        <Box sx={{ width: "100%", position: "relative" }}>
            <div style={{ position: "absolute", top: "-13px", right: "-7px" }}>
                <CloseOutlinedIcon onClick={onClose} />
            </div>
            <div
                style={{
                    borderBottom: 1,
                    borderColor: "divider",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px"
                }}
            >
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                        label={t("user-detail")}
                        {...a11yProps(0)}
                        sx={{ fontWeight: 700 }}
                        className={value === 0 ? classes.selectedTab : classes.tab}
                    />
                    <Tab
                        label={t("user-network")}
                        {...a11yProps(1)}
                        sx={{ fontWeight: 700 }}
                        className={value === 1 ? classes.selectedTab : classes.tab}
                    />
                </Tabs>
            </div>
            <Divider />
            <CustomTabPanel value={value} index={0}>
                <Container>
                    <Box sx={{ width: "100%" }}>
                        <Box>
                            <div>
                                <p style={{ fontWeight: 700, fontSize: 32 }}>{data.username}</p>
                                <div></div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "244px",
                                    alignItems: "center",
                                    padding: "15px 0"
                                }}
                            >
                                <span
                                    style={{
                                        padding: "10px",
                                        backgroundColor: "#1D9BF0",
                                        borderRadius: "53px",
                                        color: "white"
                                    }}
                                >
                                    {t("full-name")}
                                </span>
                                <span>{data.firstName + " " + data.lastName}</span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "242px",
                                    alignItems: "center",
                                    padding: "15px 0"
                                }}
                            >
                                <span
                                    style={{
                                        padding: "10px",
                                        backgroundColor: "#1D9BF0",
                                        borderRadius: "53px",
                                        color: "white"
                                    }}
                                >
                                    Username
                                </span>
                                <span>{data.email}</span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "218px",
                                    alignItems: "center",
                                    padding: "15px 0"
                                }}
                            >
                                <span
                                    style={{
                                        padding: "10px",
                                        backgroundColor: "#1D9BF0",
                                        borderRadius: "53px",
                                        color: "white"
                                    }}
                                >
                                    {t("registration-date")}
                                </span>
                                <span>{createdAt}</span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "255px",
                                    alignItems: "center",
                                    padding: "15px 0"
                                }}
                            >
                                <span
                                    style={{
                                        padding: "10px",
                                        backgroundColor: "#1D9BF0",
                                        borderRadius: "53px",
                                        color: "white"
                                    }}
                                >
                                    {t("relationship")}
                                </span>
                                <span>{data.isF1 ? "F1" : "non-F1"}</span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "255px",
                                    alignItems: "center",
                                    padding: "15px 0"
                                }}
                            >
                                <span
                                    style={{
                                        padding: "10px",
                                        backgroundColor: "#1D9BF0",
                                        borderRadius: "53px",
                                        color: "white"
                                    }}
                                >
                                    {t("level")}
                                </span>
                                <span>Free Member/Premium Member</span>
                            </div>
                        </Box>
                    </Box>
                </Container>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Box>
                    {loading ? (
                        <div style={{ position: "absolute", top: "250%", left: "42%" }}>
                            <CircularProgress style={{ width: "100px", height: "100px" }} />
                        </div>
                    ) : (
                        <OrgChartTree nodeSize={nodeSize} translate={translate} data={showData} action={showDetails} />
                    )}
                </Box>
            </CustomTabPanel>
        </Box>
    );
}
