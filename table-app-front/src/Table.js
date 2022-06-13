import './Table.css';

export default function Table({data, applySort}) {
    return (
        <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th><span className="pointer" onClick={() => applySort('name')}>Name</span></th>
            <th><span className="pointer" onClick={() => applySort('quantity')}>Quantity</span></th>
            <th><span className="pointer" onClick={() => applySort('distance')}>Distance</span></th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.distance}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}
