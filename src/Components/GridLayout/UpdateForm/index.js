import React from 'react';
import PropTypes from 'prop-types';
import scss from './updateform.module.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

/**
 *  Your Standard form. I decided to go with MaterialUI, due to familiarity, 
 *  it's well documented (mostly), 
 *  and time. Plus the Dialog and the popup menu are rather smooth.
 *  There is a caveat with using such a library:
 * 	It does not appear to play nice with libraries for running tests
 */

class UpdateForm extends React.Component {
  state = {
	open: false,
	brand: '',
	style: '',
	size: '',
	upc: '',
  };
  componentDidMount() {
	let {shoe} = this.props.context;
	this.setState({
		brand:shoe.brand,
		style:shoe.style,
		size:shoe.size,
		upc:shoe.upc
	});
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.handleFormClose();
  };
  handleSubmit = (edit) => {
		let {idx, updateShoeArray, shoe} = this.props.context;
		if(Boolean(!this.state.brand)||Boolean(!this.state.style)||Boolean(!this.state.size)||Boolean(!this.state.upc)) return;

	  	let updatedShoe = {
		brand:this.state.brand,
		style:this.state.style,
		size:this.state.size,
		upc:this.state.upc
		}
		if(edit) updatedShoe.imagePath = shoe.imagePath;

	  updateShoeArray(idx, updatedShoe, this.handleClose);
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  render() {
	const { fullScreen } = this.props;
	let disableBtn = (Boolean(!this.state.brand)||Boolean(!this.state.style)||Boolean(!this.state.size)||Boolean(!this.state.upc))
    return (
		<div>
      		<Dialog
			  fullScreen={fullScreen}
			  PaperProps={
				  {
					classes: {
						root: scss.paperRoot
					}
				  }
			  }
      		  open={this.props.open}
      		  onClose={this.handleClose}
      		  aria-labelledby="form-dialog-title"
      		>
      		  <DialogTitle id="form-dialog-title">
			  	{this.props.edit
				? 'Edit'
				: 'Add New Item'
				}
			</DialogTitle>
      		  <DialogContent>
      		      <TextField
					autoFocus
					error={Boolean(!this.state.brand)}
					helperText={this.state.brand === "" ? 'Empty field!' : ' '}
      		      	margin="dense"
					required  
					id="brand"
      		      	label="Brand"
					type="text"
					onChange={this.handleChange('brand')}
					value={this.state.brand}
					fullWidth
			    />
      		  </DialogContent>
      		  <DialogContent>
      		      <TextField
					error={Boolean(!this.state.style)}
      		      	margin="dense"
					required  
					id="style"
      		      	label="Style"
					type="text"
					onChange={this.handleChange('style')}
					value={this.state.style}
					fullWidth
			    />
      		  </DialogContent>
      		  <DialogContent>
      		      <TextField
					error={Boolean(!this.state.size)}
      		      	margin="dense"
					required  
					id="size"
      		      	label="Size"
					type="text"
					onChange={this.handleChange('size')}
					value={this.state.size}
					fullWidth
			    />
      		  </DialogContent>
      		  <DialogContent>
      		      <TextField
					error={Boolean(!this.state.upc)}
      		      	margin="dense"
					required  
					id="upc"
      		      	label="UPC"
					type="text"
					onChange={this.handleChange('upc')}
					value={this.state.upc}
					fullWidth
			    />
      		  </DialogContent>
      		  <DialogActions>
      		    <Button onClick={this.handleClose} color="primary">
      		      Cancel
      		    </Button>
							{this.props.edit
      		    ? <Button disabled={disableBtn} onClick={() => this.handleSubmit('edit')} color="primary">Submit</Button>
      		    : <Button disabled={disableBtn} onClick={() => this.handleSubmit()} color="primary">Add</Button>
							}
      		  </DialogActions>
      		</Dialog>
		</div>
    );
  }
}

UpdateForm.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};
  
export default withMobileDialog()(UpdateForm);