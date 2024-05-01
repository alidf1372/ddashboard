import React, {useEffect} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {useDispatch, useSelector} from "react-redux";
import {fetchAllMembersThunk, memberState} from "../../../store/member.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChartPerformance = ({mergedCounts}) => {

    let labels = [];
    let dataNum = [];
    const {membersList} = useSelector(memberState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllMembersThunk());
    }, []);


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: "IRANSans",
                        size: 14
                    },
                }
            },
        },
    };

    const getUserName = (username) => {
        const user = membersList.find(member => member.user_name === username);

        return user ? `${user.first_name} ${user.last_name}` : "نام کاربر نامشخص";
    };

    if (mergedCounts) {
        Object.keys(mergedCounts).forEach(key => {
            labels.push(getUserName(key));
        });
        Object.values(mergedCounts).forEach(value => {
            dataNum.push(value);
        })
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'تعداد تسک های انجام شده',
                data: dataNum,
                borderColor: 'rgb(149,99,190)',
                backgroundColor: 'rgb(113,38,173)',
            },
        ],
    };

    return (
        <>
            <Line options={options} data={data} />
        </>
    );
};

export default LineChartPerformance;
