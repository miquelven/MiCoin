import TrendingCoin from "../components/TrendingCoin";
import { Outlet } from "react-router-dom";

export default function TrendingPage () {
    return (
        <>
            <TrendingCoin   />
            <Outlet />
        </>
    )
}