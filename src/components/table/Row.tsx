import { Link } from "react-router-dom";
import {
  Column,
  User,
  Upload,
  SharedUpload,
} from "../../redux/types/ActionTypes";
import { getUserId } from "../misc/cookie";

interface RowProps {
  data: User | Upload | SharedUpload;
  columns: Column[];
  tableType: string;
  buttons?: { label: string; link: string }[];
  setEdit?: (id: string) => void;
  setDelete: (id: string) => void;
}

const tableRow = ({
  data,
  columns,
  buttons,
  tableType,
  setEdit = () => {},
  setDelete,
}: RowProps) => {
  const downloadLink = "http://localhost:3000/uploads/download/";
  const userId = getUserId();
  return (
    <div className="table-row">
      {columns.map((column, key) => {
        if (key < 2) {
          if (tableType !== "sharedTo") {
            // filename and user email id column
            if (column.key === "fileName") {
              return (
                <div
                  className={"table-cell " + (key > 0 ? "text-center" : "")}
                  key={key}
                >
                  <a
                    href={`${downloadLink}${
                      data[column.key as keyof typeof data]
                    }`}
                    className="btn-link"
                    download
                  >
                    {data[column.key as keyof typeof data]}
                  </a>
                </div>
              );
            }

            return (
              <div
                className={"table-cell " + (key > 0 ? "text-center" : "")}
                key={key}
              >
                {data[column.key as keyof typeof data]}
              </div>
            );
          } else if (data.id) {
            if (column.key === "id") {
              return (
                <div className="table-cell text-center" key={key}>
                  <button
                    className="btn-link"
                    key={key}
                    onClick={() => setDelete(data.id)}
                  >
                    Remove
                  </button>
                </div>
              );
            }

            return (
              <div
                className={"table-cell " + (key > 0 ? "text-center" : "")}
                key={key}
              >
                {data[column.key as keyof typeof data]}
              </div>
            );
          }
          return <div className="table-cell text-center" key={key}></div>;
        } else {
          if (data.id && column.key !== "sharedBy") {
            return (
              <div className="table-cell text-center" key={key}>
                {buttons?.map((btn, key) => {
                  if (btn.label === "Edit") {
                    if (tableType !== "uploads") {
                      return (
                        <Link to={`${btn.link}/${data.id}`} key={key}>
                          <button className="btn-link">{btn.label}</button>
                        </Link>
                      );
                    }
                    return (
                      <button
                        className="btn-link"
                        key={key}
                        onClick={() => setEdit(data.id)}
                      >
                        {btn.label}
                      </button>
                    );
                  } else {
                    if (tableType === "user") {
                      return (
                        <button
                          className={
                            userId === data.id ? "btn-disabled" : "btn-link"
                          }
                          key={key}
                          onClick={() => setDelete(data.id)}
                        >
                          {btn.label}
                        </button>
                      );
                    } else {
                      if (btn.label === "Share") {
                        return (
                          <Link to={`${btn.link}/${data.id}`} key={key}>
                            <button className="btn-link">{btn.label}</button>
                          </Link>
                        );
                      }
                      return (
                        <button
                          className="btn-link"
                          key={key}
                          onClick={() => setDelete(data.id)}
                        >
                          {btn.label}
                        </button>
                      );
                    }
                  }
                })}
              </div>
            );
          } else if (column.key === "sharedBy") {
            return (
              <div className="table-cell text-center" key={key}>
                {data[column.key as keyof typeof data]}
              </div>
            );
          }
          return <div className="table-cell text-center" key={key}></div>;
        }
      })}
    </div>
  );
};

export default tableRow;
