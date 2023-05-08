// import Link from "next/link";
import LoginButton from "@/components/login_button";

export default function Nav(): JSX.Element {
    return (
        <div className="flow-root bg-gray-200 p-2">
            <LoginButton/>
        </div>
    );
}
            // <button className="bg-blue-500 text-white rounded pt-1 pb-1 pl-2 pr-2 float-right">
            //     Login
            // </button>