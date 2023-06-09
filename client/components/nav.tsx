// import Link from "next/link";
import LoginButton from "@/components/login_button";

export default function Nav(): JSX.Element {
    return (
        <div className="flow-root bg-gray-200 p-2 min-w-full">
            <LoginButton/>
        </div>
    );
}