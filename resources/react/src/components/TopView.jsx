import Header from "./Header";
import { useAuthStateContext } from "../context/AuthContext";
export default function TopView() {
    const { token, currentUser } = useAuthStateContext();
    return (
        <>
            <Header />
            <h1>TopView</h1>
            {token ? "ログインされています" : "ログインされていません"}
        </>
    );
}
