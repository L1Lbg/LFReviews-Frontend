import '../assets/FormGradeInput.css'
import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: '#878484',
    fontSize: '2.5rem',
  },
  '& .MuiRating-iconFilled .MuiSvgIcon-root': {
    fontSize: '2.5rem',
  },
  '& .MuiRating-iconHover .MuiSvgIcon-root': {
    fontSize: '2.5rem',
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function FormGradeInput(props){

  const [grade, setGrade] = useState(null)
  const handleGradeChange = (e) => {
    setGrade(parseFloat(e.target.value))
  }



    return (
      <div className="FormGradeInput" key={props.name}>
        <label className="num-label" htmlFor={props.name}>
          {props.label}
        </label>
        <span>
          <StyledRating
              name={props.name}
              IconContainerComponent={IconContainer}
              getLabelText={(value) => customIcons[value].label}
              highlightSelectedOnly
              value={grade}
              onChange={handleGradeChange}
              size="large"
            />
        </span>
      </div>
    );
}