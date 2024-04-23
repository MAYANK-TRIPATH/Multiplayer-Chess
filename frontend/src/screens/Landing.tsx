import { useNavigate } from "react-router-dom";
import { Button } from "../Components/Button";

export const Landing = () => {
    const navigate = useNavigate();
    return <div className="flex justify-centre">
        <div className="pt-8 max-w-screen-lg">
            <div className="flex justify-centre">
                <img src={"/chessboard.jpg"} className="max-w-96" />
            </div>
            <div className="pt-16">
                <div className="flex justify-centre">
                    <h1 className="text-4xl font-bold text-white">PLay chess online on the #1 SITE</h1>
                </div>

                <div className="mt-8 flex justify-centre">
                    <Button onClick={() => {
                        navigate("/game")
                    }}>
                        Play Online
                    </Button>
                </div>
            </div>
        </div>

    </div>
}