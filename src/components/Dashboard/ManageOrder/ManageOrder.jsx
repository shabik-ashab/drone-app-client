import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);

  const [status, setStatus] = React.useState("");

  //   const { handleStatus, shipping, status } = props;

  useEffect(() => {
    const url = `https://hidden-mountain-15974.herokuapp.com/order`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [status]);

  const handleStatus = (state, id) => {
    const newState = {
      state: state,
    };
    const url = `https://hidden-mountain-15974.herokuapp.com/orders/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newState),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount === 1) {
          alert("changed sucessfully");
        }
        // alert("");
      })
      .finally(setStatus(state));
  };

  // delete order
  const handledelete = (id) => {
    const confirmBox = window.confirm("Do you want to cancel your Order");
    if (confirmBox === true) {
      const url = `https://hidden-mountain-15974.herokuapp.com/order/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Canceled sucessfully");
            const remaining = orders.filter((pd) => pd._id !== id);
            setOrders(remaining);
          }
        });
    }
  };

  return (
    <div>
      <header className="mb-3">
        <h1>Manage Orders</h1>
      </header>
      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="Appointments table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Adress</TableCell>
              <TableCell align="right">Zip Code</TableCell>
              <TableCell align="right">Product Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">
                Status
                <p>
                  <small>(Click to change status)</small>
                </p>
              </TableCell>
              <TableCell align="right">Cancel Order</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.zip}</TableCell>
                <TableCell className="pd-img" align="right">
                  <img alt=" " src={row.img} className="img-fluid " />
                  {row.serviceName}
                </TableCell>
                <TableCell align="right">{row.price} $</TableCell>
                {/* {
                                      status ? 
                                      <TableCell align="right">
                                  <Button onClick={handleStatus} variant="text">pending</Button>
                                  </TableCell>
                                  :
                                  <TableCell align="right">
                                  <Button variant="text">Shipped</Button>
                                  </TableCell>
                                  } */}
                {/* <TableCell align="right">
                  <Button
                    onClick={() => handleStatus(`${row._id}`)}
                    variant="text"
                  >
                    {row.status}
                  </Button>
                </TableCell> */}

                {/* {
                    status?
                    <TableCell align="right">
                  <Button
                    onClick={() =>handleStatus("Shipped") }
                    variant="text"
                  >
                    {shipping}
                  </Button>
                </TableCell>
                :
                <TableCell align="right">
                  <Button
                    onClick={() =>handleStatus("Pending") }
                    variant="text"
                  >
                    {shipping}
                  </Button>
                </TableCell>
                } */}

                <TableCell align="right">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-primary dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {row.status}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          onClick={() => handleStatus("Pending", `${row._id}`)}
                          className="dropdown-item"
                          href="#"
                        >
                          Pending
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => handleStatus("Shipped", `${row._id}`)}
                          className="dropdown-item"
                          href="#"
                        >
                          Shipped
                        </a>
                      </li>
                    </ul>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => handledelete(row._id)}
                    variant="outlined"
                    color="error"
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageOrder;
