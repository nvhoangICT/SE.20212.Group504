
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { colors } from "./colors";

export const Container = styled.View`
    flex: 1;
    background-color: ${colors.green};
    align-items: center;
`;

export const ScreenHeight = Dimensions.get("screen").height;
export const ScreenWidth = Dimensions.get("screen").width;