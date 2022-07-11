import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const MobileMenu = () => {

  const [icon, setIcon] = React.useState('');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setIcon('open')
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        { icon === 'close' ?
          <CloseIcon onClick={()=>{setIcon('open')}} style={{color:"white",fontSize:"32px",marginBottom:"5px"}}/>
          : 
          <MenuIcon onClick={()=>{setIcon('close')}} style={{color:"white",fontSize:"32px",marginBottom:"5px"}}/>
        }
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className={"mobile-menu"}
      >
        <Link to="/"><MenuItem onClick={handleClose}>Home</MenuItem></Link>
        <Link to="/shop"><MenuItem onClick={handleClose}>Shop</MenuItem></Link>
        <Link to="/stay-odd"><MenuItem onClick={handleClose}>Stay ODD</MenuItem></Link>
        <Link to="/contact"><MenuItem onClick={handleClose}>Contact</MenuItem></Link>
        <Link to="/account"><MenuItem onClick={handleClose}>Account</MenuItem></Link>
      </Menu>
    </div>
  );
}

export default MobileMenu;