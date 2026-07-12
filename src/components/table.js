export default function Table({
  headers,
  children,
}) {
  return (
    <div className="overflow-x-auto">

      <table className="w-full border border-slate-700">

        <thead>

          <tr className="bg-slate-800">

            {headers.map((header) => (
              <th
                key={header}
                className="p-3 text-left border-b border-slate-700"
              >
                {header}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>
          {children}
        </tbody>

      </table>

    </div>
  );
}