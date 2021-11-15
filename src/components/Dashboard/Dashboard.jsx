import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MyOrder from "./MyOrder/MyOrder";
import { Button } from "@mui/material";
import { Switch, Route, Link, useRouteMatch,useLocation, useHistory, } from "react-router-dom";
import MakeAdmin from "./MakeAdmin/MakeAdmin";
import ManageOrder from "./ManageOrder/ManageOrder";
import useAuth from '../../hooks/useAuth';
import Payment from "./Payment/Payment";
import UserReview from "./UserReview/UserReview";
import ManageProduct from "./ManageProduct/ManageProduct";

const drawerWidth = 200;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const {admin} = useAuth();

  const location = useLocation();
  const history = useHistory();
  const redirect_uri = location.state?.from || "/";

  const handlelogout = () =>{
      history.push(redirect_uri)
  }

  // const [shipping, setShipping] = React.useState("Pending");
  // const [status, setStatus] =  React.useState(true);
  // const handleStatus = (name) => {
  //   if (shipping === "Pending") {
  //     setStatus(true);
  //   } else {
  //     setStatus(false);
  //   }
  //   setShipping(name);
  // };

  
 

  let { path, url } = useRouteMatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Link to="/products">
        <Button className="ms-4 mt-4" color="inherit">
          products
        </Button>
      </Link>
      <Link to={`${url}`}>
        <Button className="ms-4" color="inherit">
          My Order
        </Button>
      </Link>
      <Link to={`${url}/payment`}>
        <Button className="ms-4" color="inherit">
          Payment
        </Button>
      </Link>
      <Link to={`${url}/userReview`}>
        <Button className="ms-4" color="inherit">
          Rate Us
        </Button>
      </Link>
      <Divider />
      {admin && <Box>
        <Link to={`${url}/makeAdmin`}>
        <Button className="ms-4" color="inherit">
          Make Admin
        </Button>
      </Link>
      <Link to={`${url}/manageOrder`}>
        <Button className="ms-4" color="inherit">
          Manage Order
        </Button>
      </Link>
      <Link to={`${url}/manageProduct`}>
        <Button className="ms-4" color="inherit">
          Manage Product
        </Button>
      </Link>
        </Box>}

        <Button onClick={handlelogout} className="ms-4" color="error">
          Logout
        </Button>
     
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Switch>
          <Route exact path={path}>
            <MyOrder />
          </Route>
          <Route path={`${path}/makeAdmin`}>
            <MakeAdmin />
          </Route>
          <Route path={`${path}/manageOrder`}>
            <ManageOrder              
            ></ManageOrder>
          </Route>
          <Route path={`${path}/payment`}>
            <Payment />
          </Route>
          <Route path={`${path}/userReview`}>
            <UserReview />
          </Route>
          <Route path={`${path}/manageProduct`}>
            <ManageProduct />
          </Route>
          {/* <AdminRoute path={`${path}/addDoctor`}>
                        <AddDoctor></AddDoctor>
                    </AdminRoute> */}
        </Switch>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
