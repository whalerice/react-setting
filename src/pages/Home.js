import { useState } from 'react';
import { Button, IconButton, Checkbox, Chip } from '@material-ui/core';
import { Visibility, VisibilityOff, FaceSharp, Notes, Close } from '@material-ui/icons';
import ToggleIcon from 'material-ui-toggle-icon'; //@material-ui/core 보다 다음에 선언되어야한다.
import { HomeIcon, UserNurseIcon, VirusesIcon } from 'js/svgIcons';

const Home = () => {
	const [state, setState] = useState({ on: false });
	const [state2, setState2] = useState({ on: false });
	const [checked, setChecked] = useState(true);
	const handleChange = (event) => {
		setChecked(event.target.checked);
	};
	const handleDelete = () => {
		//console.info('You clicked the delete icon.');
	};

	const handleClick = () => {
		//console.info('You clicked the Chip.');
	};
	// console.log(history);
	// console.log(history.location);

	return (
		<>
			<h2 className='title'>여기는 홈페이지입니다.</h2>
			<Button variant='contained'>Default</Button>
			<br />
			<Button variant='contained' color='primary'>
				Primary
			</Button>
			<br />
			<HomeIcon style={{ fontSize: 30 }} color='primary' />
			<br />
			<UserNurseIcon style={{ fontSize: 10 }} />
			<br />
			<VirusesIcon style={{ fontSize: 50, color: 'red' }} />
			<br />
			{/* 폰트 애니메이션 */}
			<IconButton
				onClick={() => {
					return setState2((e) => {
						return { on: !e.on };
					});
				}}
			>
				<ToggleIcon on={state2.on} onIcon={<Notes />} offIcon={<Close />} />
			</IconButton>
			<br />
			<IconButton
				onClick={() => {
					return setState((e) => {
						return { on: !e.on };
					});
				}}
			>
				<ToggleIcon on={state.on} onIcon={<Visibility />} offIcon={<VisibilityOff />} />
			</IconButton>
			<Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }} />
			<Chip icon={<FaceSharp />} label='Clickable deletable' onClick={handleClick} onDelete={handleDelete} />
		</>
	);
};

export default Home;
