import React from 'react';

export function useFetchRecords(filter, setData) {
    React.useEffect(() => {
        fetch('http://localhost:4000/records', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(filter)
        })
            .then(res => res.json())
            .then(jsonRes => setData(jsonRes));
    }, [filter, setData]);
}
