import { Drawer } from "@mui/material";

const LeftNavigation = () => {
    return (
        <Drawer
            anchor={'left'}
            open={true}
            variant="permanent"
            className="left-drawer"
        >

            <a href='/'>
                Home
            </a>

            <a href='/vagas'>
                Vagas
            </a>
        </Drawer>
    )
}

export default LeftNavigation;
