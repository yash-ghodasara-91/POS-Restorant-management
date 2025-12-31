import { useEffect, useState } from "react";
import { getUserData } from "../https";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";




const useLoadData = () => {

    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            // Your data fetching logic here
            try {
                
                const {data} = await getUserData();
                const {_id, name, email, phone, role, token} = data.data;
                            dispatch(setUser({ _id, name, email, phone, role, token  }))
                

            } catch (error) {
                dispatch(removeUser());
                Navigate("/auth");
                console.log(error);
                
            } finally {
                setIsLoading(false);
            }
    }

        fetchData();

    },[dispatch, Navigate]);

    return isLoading;
}

export default useLoadData;