import TableRow from "./Row";

interface TableProps {
  data: object[];
  columns: { label: string; key: string }[];
  minRow: number;
  tableType: string;
  buttonList?: { label: string; link: string }[];
  setEdit?: (id: string) => {};
  setDelete?: (id: string) => void;
}
const Table = (props: TableProps) => {
  const length =
    props.data.length < props.minRow ? props.minRow : props.data.length;
  const {
    data,
    columns,
    tableType,
    buttonList,
    setEdit = () => {},
    setDelete = () => {},
  } = props;
  const extraCols = props.tableType === "shared" ? 3 : 0;
  const upload = { id: "", fileName: "", label: "", sharedTo: [] };
  const shared = { id: "", fileName: "", label: "", sharedBy: "" };
  const user = { id: "", name: "", email: "" };
  const dataList =
    tableType !== "user" ? (tableType === "uploads" ? upload : shared) : user;

  return (
    <>
      <div className="table">
        <div className="table-header">
          {props.columns.map((column, index) => (
            <div className="col-4 th-cell" key={index}>
              <div className={"box " + (index > 0 ? "text-center" : "")}>
                {column.label}
              </div>
            </div>
          ))}
        </div>
        <div className="table-body" id="tableBody">
          {[...Array(length)].map((_, i) => {
            return (
              <TableRow
                key={i}
                data={{ ...dataList, ...data[i] }}
                columns={columns}
                tableType={tableType}
                buttons={buttonList}
                setEdit={setEdit}
                setDelete={setDelete}
              />
            );
          })}
          <div className="table-row">
            {[...Array(extraCols)].map((_, i) => {
              return <div className="table-cell" key={i}></div>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
