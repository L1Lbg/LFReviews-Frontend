import { useEffect, useState } from "react";

export default function Maintenance() {
    const [minLeft, setMinLeft] = useState(20);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    useEffect(() => {
        const date = new Date();
        const mseconds = date.getTime();
        const main_start = parseInt(import.meta.env.VITE_MAINTENANCE_START, 10);
        const main_end = parseInt(import.meta.env.VITE_MAINTENANCE_END, 10);

        // Calculate minutes left
        setMinLeft(Math.max(0, Math.round(((main_end - mseconds) / 1000) / 60)));

        // Format start and end times
        const formatDate = (timestamp) => {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
            return new Date(timestamp).toLocaleString(undefined, options);
        };

        setStart(formatDate(main_start));
        setEnd(formatDate(main_end));
    }, []);
3
    //https://www.unixtimestamp.com/
    return (
        <div id="Maintenance" style={{minHeight:'90vh'}}>
            Started at: {start} <br />
            Ending at: {end} <br />
            Maintenance: {minLeft} minutes left...
        </div>
    );
}
