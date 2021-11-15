import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import axios from "axios";

import { useForm } from "react-hook-form";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetch(`http://localhost:5000/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  const handledelete = (id) => {
    const confirmBox = window.confirm("Do you want to cancel your Order");
    if (confirmBox === true) {
      const url = `http://localhost:5000/products/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("deleted sucessfully");
            const remaining = products.filter((pd) => pd._id !== id);
            setProducts(remaining);
          }
        });
    }
  };

  const onSubmit = (data) => {
    axios.post('http://localhost:5000/products',data)
    .then( res => {
        if(res.data.insertedId){
            alert('added sucessfully');
            reset();
        }
    })
  };
  return (
    <div>
      <header>
        <h1 className="text-center mt-3  mb-5">Manage Products</h1>
      </header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <TableContainer component={Paper}>
              <Table sx={{}} aria-label="Appointments table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Delete Product</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell className="pd-img" component="th" scope="row">
                        <img src={row.img} className="img-fluid " />
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.price} $</TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => handledelete(row._id)}
                          variant="outlined"
                          color="error"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="col-lg-6 col-md-12">
            <header className="text-center mb-4 mt-4">
              <h4>Add Products</h4>
            </header>
            <form
              className="my-form text-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input {...register("name")} placeholder="Name" />
              <br />
              <input
                className="mt-3"
                {...register("camera")}
                placeholder="Camera"
              />
              <br />
              <input
                className="mt-3"
                {...register("time")}
                placeholder="Time"
              />
              <br />
              <input
                className="mt-3"
                type="number"
                {...register("price")}
                placeholder="price"
              />
              <br />
              <input className="mt-3" {...register("img")} placeholder="img" />
              <br />
              <input
                className="mt-3 mb-3"
                type="number"
                {...register("id")}
                placeholder="id"
              />
              <br />

              <Button type="submit" variant="contained">SUBMIT</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
