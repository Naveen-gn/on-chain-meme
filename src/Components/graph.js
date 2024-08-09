import { createClient } from "urql";
import { useEffect, useState } from 'react';

function Graph({ onDataReceived }) {
    const [dataAddeds, setDataAddeds] = useState([]);
    const QueryURL = "https://api.studio.thegraph.com/query/69475/onchainmeme/version/latest";
    const query = `
 {
  approvalForAlls(first: 5) {
    id
    account
    operator
    approved
  }
  transferBatches(first: 5) {
    id
    operator
    from
    to
  }
}
`;
    const client = createClient({
        url: QueryURL
    });

    useEffect(() => {
        const getDataAddeds = async () => {
            const { data } = await client.query(query).toPromise();
            console.log(data);
            setDataAddeds(data.dataAddeds);
            onDataReceived(data.dataAddeds);
        }
        getDataAddeds();
    }, [onDataReceived]);

    return null; // Since this component doesn't render anything, return null
}

export default Graph;